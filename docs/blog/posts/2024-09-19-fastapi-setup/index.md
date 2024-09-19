---
date: 2024-09-19

comments: true
---

# Setup FastAPI Project with Async SQLAlchemy 2, Alembic, PostgreSQL and Docker

In this blog post, I'll show creating a FastAPI project using SQLAlchemy version 2 with asyncio and
Alembic. I'll use PostgreSQL as the database and show how to Dockerize the project at the end.

<!-- more -->

!!! info

    I assume you already know the basics of FastAPI and Docker.

It's really easy and straightforward to create a FastAPI project. But properly adding SQLAlchemy and
Alembic to the project can not be as straightforward as it. I'm definitely not saying it's
complicated but gets some time especially if it's your first time using SQLAlchemy. So in this blog
I'm going to share with you how I setup SQLAlchemy and Alembic when I create a FastAPI project. I
will create a simple todo app with CRUD endpoints. Hope it helps :). If you have any questions or
suggestions please leave a comment.

Completed project on GitHub: [:octicons-mark-github-16:
berk-karaal/fastapi-sqlalchemy-alembic-setup](https://github.com/berk-karaal/fastapi-sqlalchemy-alembic-setup)


## Create Simple FastAPI Project

Always use a virtual environment for your Python projects. I prefer `virtualenv` but sure you can
use whatever tool you like.

```console
$ virtualenv venv --python python3.11
$ source venv/bin/activate
```

Install FastAPI

```console
$ pip install fastapi[standard]
```

Create `main.py` and `app.py` under `src/` directory.

```console
$ mkdir src
$ touch src/main.py src/app.py
```

```python title="src/app.py"
from fastapi import APIRouter, FastAPI

app = FastAPI()

v1_router = APIRouter(prefix="/api/v1")

app.include_router(v1_router)
```

```python title="src/main.py"
import uvicorn

if __name__ == "__main__":
    uvicorn.run("src.app:app", host="0.0.0.0")
```

I prefer starting the server using uvicorn package in code instead of the `uvicorn` command. This
way you can specify uvicorn options dynamically by code.

You can start the app using `#!console $ python3 -m src.main` command.

## Start PostgreSQL Database

I use docker to run PostgreSQL in my local machine. Create `docker-compose.yaml` at the project
root.

```yaml title="docker-compose.yaml"
services:
  postgres:
    image: postgres:16-alpine
    volumes:
      - ./var/db:/var/lib/postgresql/data # (1)!
    ports:
      - "5432:5432" # (2)!
    environment: # (3)!
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=db
```

1. Mount `./var/db` directory to postgres image for data persistency.
2. Expose the PostgreSQL port to the host machine.
3. Set the environment variables for the PostgeSQL image.

Start postgres service using `docker compose up -d` command. You can stop it using `docker compose
down` command.

## Add SQLAlchemy

Before installing SQLAlchemy I want to remind you about version 2 style of the SQLAlchemy. Most of
the tutorials still use the SQLAlchemy in version 1 style, this blog uses version 2 style of
SQLAlchemy. You can learn more about version 1 and 2 style on
[docs.sqlalchemy.org/en/20/changelog/migration_20.html](https://docs.sqlalchemy.org/en/20/changelog/migration_20.html).
Also since we are using FastAPI which is based on Starlette which implements ASGI, we should use
async packages if we can to get the most out of the FastAPI and ASGI standard. Luckily, SQLAlchemy
has async support and we'll use it in this blog. More about async SQLAlchemy:
[docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html).


```console
$ pip install sqlalchemy[asyncio]
$ pip install asyncpg
```

Pay attention that we installed (and will use) `asyncpg` instead of `psycopg2` dialect for async
support.

Create `src/db.py`:

```python title="src/db.py"
import datetime
from typing import AsyncGenerator

from sqlalchemy import DateTime
from sqlalchemy.ext.asyncio import (
    AsyncAttrs,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase


class Base(AsyncAttrs, DeclarativeBase):
    """Base class for all models"""

    type_annotation_map = {
        datetime.datetime: DateTime(timezone=True),
    } # (1)!


engine = create_async_engine(
    "postgresql+asyncpg://postgres:postgres@localhost:5432/db",
    echo=True,
)  # (2)!

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

async def get_async_db_session() -> AsyncGenerator[AsyncSession, None]: # (3)!
    async with async_session_maker() as session:
        yield session

```

1. Set the type annotation map for the SQLAlchemy to use the correct type for the columns. In this
   case I set the datetime type to be timezone aware on the database.
2. Create the **async** engine for the database connection. Connection credentials are the ones in
   the `docker-compose.yaml` file.
3. This is our dependency that we will use in our FastAPI routes to get the database session. You
   may place this in a separate file/directory created for dependencies on your project.

## Add Settings File

I hard-coded the database connection string in the `db.py` file. It's definitely not a good
practice. So let's create a settings file to store the configurations. You can use
[pydantic-settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/) or other
alternatives to manage settings in your project. But in this post I'll create a simple module to
read environment variables.

```console
$ pip install python-dotenv
$ touch .env src/settings.py
```

```plaintext title=".env"
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB=db
SQLALCHEMY_ECHO=true
```

```python title="src/settings.py"
import os

from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file if it exists


class _NoArg:
    """A sentinel value to indicate that a parameter was not given"""


NO_ARG = _NoArg()


def get_env_var(key: str, default: str | _NoArg = NO_ARG) -> str:
    """Get an environment variable, raise an error if it is missing and no default is given."""
    try:
        return os.environ[key]
    except KeyError:
        if isinstance(default, _NoArg):
            raise ValueError(f"Environment variable {key} is missing")

        return default


PG_HOST = get_env_var("PG_HOST")
PG_PORT = get_env_var("PG_PORT")
PG_USER = get_env_var("PG_USER")
PG_PASSWORD = get_env_var("PG_PASSWORD")
PG_DB = get_env_var("PG_DB")

SQLALCHEMY_DATABASE_URL = (
    f"postgresql+asyncpg://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{PG_DB}"
)
SQLALCHEMY_ECHO = get_env_var("SQLALCHEMY_ECHO", "") == "true"
```

Now update the `src/db.py` file to use the settings file instead of hard-coded values:

```python title="src/db.py" hl_lines="3 6 7"
# ...

from src import settings

engine = create_async_engine(
    settings.SQLALCHEMY_DATABASE_URL,
    echo=settings.SQLALCHEMY_ECHO,
)

# ...
```

## Create Todo Model

I prefer creating separate directories for the features of the project, like a Django app. So I'll
create a `todo` directory under `src` directory to store todo related files.

Create `src/todo/models.py` for the `Todo` model:

```python title="src/todo/models.py"
from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column

from src.db import Base


class Todo(Base):
    __tablename__ = "todo"

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str]

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now()
    )
    deleted_at: Mapped[datetime | None] # (1)!

    def __repr__(self) -> str:
        return f"Todo(id={self.id})"
```

1. I used `deleted_at` column to implement soft delete. This way we don't delete the rows from the
   database but mark them as deleted by setting the `deleted_at` column to a value. It's important
   to remember filter out deleted rows in the queries.

The `Mapped` annotation we use to define a column is the modern form of SQLAlchemy. It's used to map
a column type by the type annotation you gave. It's also used in type checking, for example on query
results. The classes which use `Mapped` type are called **mapped classes**, you can learn more about
it on
[docs.sqlalchemy.org/en/20/tutorial/metadata.html#declaring-mapped-classes](https://docs.sqlalchemy.org/en/20/tutorial/metadata.html#declaring-mapped-classes).

As you can remember from the `db.py` file, we set the `datetime` type to be mapped as
`DateTime(timezone=True)`. This way, all the columns annotated with `Mapped[datetime]` will be
mapped as timezone aware datetime columns.

!!! info "`server_default`"

    `server_default` shouldn't be confused with `default`. `server_default` is used to set the value
    on the database side, `default` is used to set the value on the Python side. <br>
    More on `server_default`:
    [docs.sqlalchemy.org/en/20/core/defaults.html#server-invoked-ddl-explicit-default-expressions](https://docs.sqlalchemy.org/en/20/core/defaults.html#server-invoked-ddl-explicit-default-expressions) <br>
    More on `default`:
    [docs.sqlalchemy.org/en/20/core/defaults.html#scalar-defaults](https://docs.sqlalchemy.org/en/20/core/defaults.html#scalar-defaults)


## Setup Database Migrations with Alembic

[Alembic](https://github.com/sqlalchemy/alembic) is a lightweight database migration tool for
SQLAlchemy. It's easy to use and it can automatically generate migration files for you.

Install Alembic:

```console
$ pip install alembic
```

Installation will add `alembic` command to your path. We will use this command to generate migration
files and manage the database schema.

Alembic uses a migration environment which is a directory that contains the configuration and
migration files. To start using alembic you should create the migration environment and do the
necessary configurations for your database, models etc.

1. **Create the migration environment**

    ```console
    $ alembic init -t async alembic
    ```

    This command will create `alembic` directory and `alembic.ini` file in the project root. I won't
    get into `alembic.ini` file details, you can leave it as is. The `alembic` directory which we
    will use contains `env.py` and the migration files we will create in the future.

    Since we are using async SQLAlchemy and `asyncpg`, we created the migration environment with `-t
    async` option. This will create the migration environment with async support.

2. **Set the database URL in the `env.py` file**

    Update the `alembic/env.py` file to use the database URL from the settings file.

    ```python title="alembic/env.py" hl_lines="3 14"
    # ...
    from alembic import context
    from src import settings

    # this is the Alembic Config object, which provides
    # access to the values within the .ini file in use.
    config = context.config

    # Interpret the config file for Python logging.
    # This line sets up loggers basically.
    if config.config_file_name is not None:
        fileConfig(config.config_file_name)

    config.set_main_option("sqlalchemy.url", settings.SQLALCHEMY_DATABASE_URL)

    # ...
    ```

3. **Add naming convetions to Base model metadata**
   
    This is one of the most important steps to make Alembic properly autogenerate the migration
    files. Details of this step are explained very clearly in the Alembic documentation:
    [The Importance of Naming Constraints](https://alembic.sqlalchemy.org/en/latest/naming.html).

    Update the `Base` class in the `src/db.py` file to set the naming conventions:

    ```python title="src/db.py" hl_lines="2 9-17"
    # ...
    from sqlalchemy import Metadata

    # ...

    class Base(AsyncAttrs, DeclarativeBase):
        """Base class for all models"""

        metadata = MetaData(
            naming_convention={
                "ix": "ix_%(column_0_label)s",
                "uq": "uq_%(table_name)s_%(column_0_name)s",
                "ck": "ck_%(table_name)s_`%(constraint_name)s`",
                "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
                "pk": "pk_%(table_name)s",
            }
        )

        type_annotation_map = {
            datetime.datetime: DateTime(timezone=True),
        }
    # ...
    ```

4. **Add Base model metadata to `env.py` file**

    Update the `alembic/env.py` file to add Base model metadata.

    ```python title="alembic/env.py" hl_lines="5-7"
    # ...

    # add your model's MetaData object here
    # for 'autogenerate' support
    from src.db import Base

    target_metadata = Base.metadata

    # ...
    ```

5. **Import your models on `env.py` file**

    For autogenerate to work, alembic should be able to find your models. Easiest way to do this is
    importing your models on the `env.py` file.

    ```python title="alembic/env.py" hl_lines="5"
    # ...

    from alembic import context
    from src import settings
    from src.todo.models import *

    # ...
    ```

    Don't forget to import new models you create in the future. If you forget to import a model, the
    autogenerate command will not generate the migration file for that model.

Now alembic is ready for use. I prefer to use autogenerated migration files instead of writing them
manually. Just don't forget the check the generated migration files before applying them to the
database. Create the initial migration file:

```console
$ alembic revision --autogenerate -m "initial migration"
```

Your database should be running before running the above command. The command will generate the
migration file under the `alembic/versions` directory. It's name should be something like
`<revision_id>_initial_migration.py`. The revision id is a unique identifier for the migration file.
It's important for alembic to work but you can change the file name, alembic will read it from the
file content. I prefer to number the migration files to keep them in order. You can change the
migration file name to `001_initial_migration.py` if you want.

In order to apply the migration to the database, run the following command:

```console
$ alembic upgrade head
```

This will apply all migrations to the database. You can check your database with your favorite
database client to see created tables.


Some useful alembic commands:

- `alembic history`: Show the history of the migrations.
- `alembic downgrade -1`: Downgrade the database by 1 revision.
- `alembic downgrade <revision_id>`: Downgrade the database to the specified revision.
- `alembic current`: Show the current revision of the database.

Check out alembic docs for more:
[alembic.sqlalchemy.org/en/latest/tutorial.html](https://alembic.sqlalchemy.org/en/latest/tutorial.html).

## Add CRUD Endpoints

I place my routes and request/response schemas under the `src/todo/routes` directory. Create
`src/todo/routes/todo.py` and `src/todo/routes/schemas.py` files. `src/todo/routes/todo.py` will
contain the CRUD endpoint routes for todo model, the main app router will include this router.


```console
$ mkdir src/todo/routes
$ touch src/todo/routes/todo.py src/todo/routes/schemas.py
```

### Add Creating Todo Endpoint

Request and response schemas for creating todo endpoint:

```python title="src/todo/routes/schemas.py"
from datetime import datetime

from pydantic import BaseModel


class CreateTodoRequest(BaseModel):
    content: str


class CreateTodoResponse(BaseModel):
    id: int
    content: str
    created_at: datetime
    updated_at: datetime
```

Creating todo endpoint:

```python title="src/todo/routes/todo.py"
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.db import get_async_db_session
from src.todo import models
from src.todo.routes import schemas

# /api/v1/todo
router = APIRouter()


@router.post("", summary="Create a new todo")
async def create_todo(
    db: Annotated[AsyncSession, Depends(get_async_db_session)],
    reqeust_data: schemas.CreateTodoRequest,
) -> schemas.CreateTodoResponse:
    todo = models.Todo(content=reqeust_data.content)
    db.add(todo)
    await db.commit()
    await db.refresh(todo)
    return schemas.CreateTodoResponse(
        id=todo.id,
        content=todo.content,
        created_at=todo.created_at,
        updated_at=todo.updated_at,
    )
```

### Add Retrieving Todo Endpoint

Schemas for retrieving todo endpoint:

```python title="src/todo/routes/schemas.py"
# ...

class RetrieveTodoResponse(BaseModel):
    id: int
    content: str
    created_at: datetime
    updated_at: datetime
```

As you can see, I created a separate schema for the retrieve endpoint even it's the same as the
create endpoint response schema. I prefer to do this to keep the schemas clean.

Retrieving todo endpoint:

```python title="src/todo/routes/todo.py"
# ...
from fastapi import HTTPException
from sqlalchemy import select

@router.get("/{todo_id}", summary="Retrieve a todo")
async def retrieve_todo(
    db: Annotated[AsyncSession, Depends(get_async_db_session)],
    todo_id: int,
) -> schemas.RetrieveTodoResponse:
    stmt = select(
        models.Todo.id,
        models.Todo.content,
        models.Todo.created_at,
        models.Todo.updated_at,
    ).where(
        models.Todo.id == todo_id,
        models.Todo.deleted_at.is_(None),
    )
    result_row = (await db.execute(stmt)).first()

    if result_row is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    mapped_row = result_row._mapping
    return schemas.RetrieveTodoResponse(
        id=mapped_row[models.Todo.id],
        content=mapped_row[models.Todo.content],
        created_at=mapped_row[models.Todo.created_at],
        updated_at=mapped_row[models.Todo.updated_at],
    )
```

### Add Listing Todos Endpoint

Schemas for listing todos endpoint:

```python title="src/todo/routes/schemas.py"
# ...

class ListTodosResponseItem(BaseModel):
    id: int
    content: str
    created_at: datetime
    updated_at: datetime


class ListTodosResponse(BaseModel):
    count: int
    items: list[ListTodosResponseItem]
```

Listing todos endpoint:

```python title="src/todo/routes/todo.py"
# ...
from sqlalchemy import func

@router.get("", summary="List all todos")
async def list_todos(
    db: Annotated[AsyncSession, Depends(get_async_db_session)],
) -> schemas.ListTodosResponse:
    count_stmt = select(func.count(models.Todo.id)).where(
        models.Todo.deleted_at.is_(None),
    )
    count_result = (await db.execute(count_stmt)).scalar() or 0

    stmt = (
        select(
            models.Todo.id,
            models.Todo.content,
            models.Todo.created_at,
            models.Todo.updated_at,
        )
        .where(
            models.Todo.deleted_at.is_(None),
        )
        .order_by(models.Todo.created_at.desc())
    )
    result_rows = (await db.execute(stmt)).all()

    return schemas.ListTodosResponse(
        count=count_result,
        items=[
            schemas.ListTodosResponseItem(
                id=row.id,
                content=row.content,
                created_at=row.created_at,
                updated_at=row.updated_at,
            )
            for row in result_rows
        ],
    )
```

I didn't add pagination to the listing endpoint but get the count of the todos with a separate query
just to show how to do it. You can add pagination to the endpoint by adding query parameters to the
endpoint and using them in the query.

Also I didn't use `._mapping` for the returned rows. There are many ways to get the values from the
returned rows. I don't have a specific reason to use `._mapping` or not, you can share your thoughts
on this in the comments.

### Add Updating Todo Endpoint

Schemas for updating todo endpoint:

```python title="src/todo/routes/schemas.py"
class UpdateTodoRequest(BaseModel):
    content: str


class UpdateTodoResponse(BaseModel):
    id: int
    content: str
    created_at: datetime
    updated_at: datetime
```

Updating todo endpoint:

```python title="src/todo/routes/todo.py"
@router.put("/{todo_id}", summary="Update a todo")
async def update_todo(
    db: Annotated[AsyncSession, Depends(get_async_db_session)],
    todo_id: int,
    request_data: schemas.UpdateTodoRequest,
) -> schemas.UpdateTodoResponse:
    stmt = select(models.Todo).where(
        models.Todo.id == todo_id,
        models.Todo.deleted_at.is_(None),
    )
    todo = (await db.execute(stmt)).scalar()
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo.content = request_data.content
    await db.commit()
    await db.refresh(todo)
    return schemas.UpdateTodoResponse(
        id=todo.id,
        content=todo.content,
        created_at=todo.created_at,
        updated_at=todo.updated_at,
    )
```

In this route, I used `scalar` method to directly get a Todo object so I can easily update it.

### Add Deleting Todo Endpoint

Deleting todo endpoint:

```python title="src/todo/routes/todo.py"
@router.delete("/{todo_id}", summary="Delete a todo", status_code=204)
async def delete_todo(
    db: Annotated[AsyncSession, Depends(get_async_db_session)],
    todo_id: int,
) -> None:
    stmt = select(models.Todo).where(
        models.Todo.id == todo_id,
        models.Todo.deleted_at.is_(None),
    )
    todo = (await db.execute(stmt)).scalar()
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo.deleted_at = func.now()
    await db.commit()
    await db.refresh(todo)
    return None
```

We used soft delete in this route. If you want to delete the row from the database you can use the
[delete()](https://docs.sqlalchemy.org/en/20/tutorial/data_update.html#the-delete-sql-expression-construct)
function to create a delete statement.

### Include Todo Router to the Main App Router

```python title="src/app.py" hl_lines="3 9"
from fastapi import APIRouter, FastAPI

from src.todo.routes.todo import router as todo_router

app = FastAPI()

v1_router = APIRouter(prefix="/api/v1")

v1_router.include_router(todo_router, prefix="/todo")

app.include_router(v1_router)
```

## Test the Endpoints

Our simple todo api is ready to test. You can start the server using `$ python3 -m src.main` command
and test the endpoints using swagger docs comes with FastAPI. Make sure the database is running and
the migration is applied to the database before starting the server. Go to
`http://localhost:8000/docs` to see the swagger docs FastAPI generated for us. You can test the CRUD
endpoints and see the SQLAlchemy logs in the console. These logs are printed because we set the
`echo` parameter to `True` in the `create_async_engine` function in the `src/db.py` file by
environment variables.

## Dockerize the Server

It's a good idea to dockerize your backend project not only for deployment but also for development,
especially if you are working with a team. It's easier to setup the project for new developers and
it's more consistent.

Create `requirements.txt` file in the project root:

```plaintext title="requirements.txt"
fastapi[standard]>=0.115.0,<0.116.0
sqlalchemy[asyncio]>=2.0.0,<2.1.0
asyncpg>=0.29.0,<0.30.0
python-dotenv>=1.0.0,<1.1.0
alembic>=1.13.0,<1.14.0
```

Create `Dockerfile` in the project root:

```dockerfile title="Dockerfile"
FROM python:3.11-bookworm

# (1)!
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# (2)!
COPY ./requirements.txt ./requirements.txt

RUN pip install -r ./requirements.txt

COPY . .
```

1. Set the `PYTHONUNBUFFERED` environment variable to prevent Python from buffering the output. <br>
   More: 1[stackoverflow.com/a/59812588/10703053](https://stackoverflow.com/a/59812588/10703053)
2. Copying the `requirements.txt` separately from the project files to use the Docker cache. This
   way Docker will not install the requirements again if the `requirements.txt` file is not changed.

!!! warning "Create `.dockerignore` file"

    Don't forget to create a `.dockerignore` file to exclude unnecessary files from the Docker image.
    It's similar to `.gitignore` file. You can exclude the `venv` directory, `.env` file etc. You can
    generate a `.dockerignore` file using [gitignore.io](https://gitignore.io/) with "Python" template:
    [https://www.toptal.com/developers/gitignore?templates=python](https://www.toptal.com/developers/gitignore?templates=python)


I didn't add a `CMD` or `ENTRYPOINT` instruction to the Dockerfile because I won't use this Docker
image solely for starting the server. I prefer to use `docker-compose.yaml` to set the starting
server instructions for this project. If you will deploy the project using this Docker image, you
can add `CMD` or `ENTRYPOINT` instructions to the Dockerfile.

Add our server as a service to `docker-compose.yaml` file:

```yaml title="docker-compose.yaml"
services:
  postgres:
    # ...

  backend:
    build: .
    restart: on-failure
    command: bash -c "alembic upgrade head && python3 -m src.main" # (1)!
    ports:
      - "8000:8000"
    depends_on:
      - postgres
    env_file: .env # (2)!
    environment: # (3)!
      - PG_HOST=postgres

```

1. I added a `command` instruction to the backend service to run the alembic upgrade command before
   starting the server. This way the database will be upgraded before the server starts. You can
   also run the alembic upgrade command manually before starting the server.
2. Use the `.env` file to set the environment variables for the backend service.
3. Override the `PG_HOST` environment variable to connect to the `postgres` service instead of
   `localhost`.

Now you can both start the server and the database using `$ docker compose up -d` command. You can
watch the logs of our server using `$ docker compose logs -f backend` command. You can stop the
services using `$ docker compose down` command.

That's it! We created a FastAPI project with async SQLAlchemy, Alembic, PostgreSQL and Docker. 
Hope this blog post helps you to setup your FastAPI project. If you have any questions or
suggestions please leave a comment.

You can find the completed project on GitHub: [:octicons-mark-github-16:
berk-karaal/fastapi-sqlalchemy-alembic-setup](https://github.com/berk-karaal/fastapi-sqlalchemy-alembic-setup)