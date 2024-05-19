---
comments: true
---

# Python Virtualenv

This note is created to send my friends when anytime they ask again how to use virtualenvs in Python
:smile:


## Install virtualenv tool

Debian: `$ sudo apt install python3-virtualenv` <br>
Fedora: `$ sudo dnf install python3-virtualenv`

## Create virtualenv

In your project folder: `$ virtualenv venv --python python3.11`

- `venv`: the folder which virtualenv will use
- `--python python3.11`: The Python binary which virtualenv will use. It's optional but I think
this as a nice habit to explicitly say which version of Python to use.

## Activate virtualenv

bash shell: `$ source ./venv/bin/activate` <br>
fish shell: `$ source ./venv/bin/activate.fish`

## Deactivate virtualenv

You can just run `$ deactive` after you activate the virtualenv.

## Upgrade Python version

You have to remove the virtualenv folder and then create a new virtualenv with the Python version
you want. Deactivate the current virtualenv before removing it. You will also need to install
the requirements again for the new virtualenv you created.