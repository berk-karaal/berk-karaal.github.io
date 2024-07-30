# List available recipes
default:
    @just --list --justfile {{justfile()}}

# Start the development server
serve:
    mkdocs serve -w overrides/
