---
date: 2024-12-06
description:
    A quick introduction to Just command runner. What is it and how to use it?
comments: true
---


# Just, start using it!

A really quick introduction to Just command runner. What is it and how to use it?

<!-- more -->

!!! info "A More Detailed Blog Post Suggestion"

    If you have time like ~10 minutes, I suggest you to read the "Just! Stop using Makefile" blog
    post written by The Orange One (Jake Howard). I first heard about Just from that blog post and
    I enjoyed reading it. You can find the post here: [theorangeone.net/posts/just-stop-using-makefile/](https://theorangeone.net/posts/just-stop-using-makefile/)

    My blog post is a quick introduction to Just. It's not a detailed guide, but it's enough to
    *start using it*.

## What is Just?

Just is a cross-platform command runner, a tool that helps you to run commands defined in a file. It
is really similar to Make, but it's focused on being a command runner rather than a build tool. For
a command runner tool Just has improvements over Make, for example listing available recipes,
passing arguments to recipes, and more.

What is a recipe? In Just, recipe is a command or command set that you want to run. Recipes are
defined in a file called `justfile` (like the `Makefile` in Make). You can define multiple recipes
in a `justfile` and run them by the name you set. `justfile` file naming is case-insensitive,
personally I prefer to use `Justfile` to make it more visible.

Before going further, let me show you an example `Justfile` with 2 simple recipes:

```make title="Justfile"
# Print "Hello World!"
hello:
	echo "Hello World!"

# Format swag comments, then genereate swagger files
swag:
    swag fmt -g cmd/restapi/main.go
    swag init --pd -d ./internal/controllers -g ../../cmd/restapi/main.go -o ./swagger
```

To execute a recipe, you can simply run `#!console $ just hello` or `#!console $ just swag`
commands. Just like Make ;)

## Install Just

Luckily, Just is available in most package managers. For example:

=== ":simple-fedora: Fedora"

    ```console
    $ sudo dnf install just
    ```

=== ":simple-ubuntu: Ubuntu"

    ```console
    $ sudo apt install just
    ```

=== ":simple-homebrew: Homebrew"

    ```console
    $ brew install just
    ```

For other package managers check out
[Installation](https://github.com/casey/just?tab=readme-ov-file#installation) section on Just GitHub
repo.

## Use Just

To use Just, you need to create a `Justfile` in your project directory. You will define your recipes
in this file. After creating the `Justfile`, you can run your recipes using `$ just
<name-of-your-recipe>` command.

!!! quote "Justfile location"

    When you invoke `just` it looks for file justfile in the current directory and upwards, so you
    can invoke it from any subdirectory of your project.

    \- Just Manual

### Hello World

```make title="Justfile"
# Print "Hello World!"
hello:
    echo "Hello World!"
```

```console
$ just hello
echo "Hello World!"
Hello World!
```

The comment line above the recipe is optional, if you add (which you should) it will be displayed
next to the recipe names when you list the recipes.

### Listing Recipes

You can list recipes defined in the `Justfile` by running `#!console $ just --list` command.

??? abstract "Justfile"

    ```make title="Justfile"
    # Start dev server
    run:
        python3 -m src.app

    # Run ruff check and format
    ruff:
        ruff check src/ --fix
        ruff format src/

    # Run type checking with mypy
    mypy:
        mypy src/

    # Running tests with pytest
    test:
        pytest -v
    ```

```console
$ just --list
Available recipes:
    mypy # Run type checking with mypy
    ruff # Run ruff check and format
    run  # Start dev server
    test # Running tests with pytest
```

### Default Recipe

If you run `just` command without any arguments, it will run the first recipe in the `Justfile`. I
prefer using the default recipe functionality to list available recipes.

??? abstract "Justfile"

    ```make title="Justfile"
    # List available recipes
    default:
        @just --list

    # Start dev server
    run:
        python3 -m src.app

    # Run ruff check and format
    ruff:
        ruff check src/ --fix
        ruff format src/

    # Run type checking with mypy
    mypy:
        mypy src/

    # Running tests with pytest
    test:
        pytest -v
    ```

```console
$ just
Available recipes:
    default # List available recipes
    mypy    # Run type checking with mypy
    ruff    # Run ruff check and format
    run     # Start dev server
    test    # Running tests with pytest
```

!!! tip "Hide recipe from list"

    If you don't want a recipe to be listed in the recipes list, you can start the recipe name with
    an underscore `_`. For example, `_default`.

### Recipe Parameters

You can add parameters to your recipes.

??? abstract "Justfile"

    ```make title="Justfile"
    # Greet the user
    greet username:
        echo "Hello, {{username}}!"
    ```

```console
$ just greet Berk
echo "Hello, Berk!"
Hello, Berk!
```

---

There is a lot more features in Just. If you are interested, you should check out the Just Manual.
It's really well documented and easy to understand.

Just GitHub Repo: [:octicons-mark-github-16: github.com/casey/just](https://github.com/casey/just) <br>
Just Manual: [just.systems/man/en/](https://just.systems/man/en/)

Cheat Sheet to explore Just features quickly:
  [cheatography.com/linux-china/cheat-sheets/justfile/](https://cheatography.com/linux-china/cheat-sheets/justfile/)

Ohh, did I mention that Just is written in Rust?