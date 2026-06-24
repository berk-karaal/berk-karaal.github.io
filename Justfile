# List available recipes
default:
    @just --list --justfile {{justfile()}}

# Start the development server
serve:
    properdocs serve -w overrides/
