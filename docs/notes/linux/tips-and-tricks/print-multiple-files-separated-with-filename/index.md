---
comments: true
---

# Print Multiple Files Separated With Filename

```console
$ tail -n +1 mkdocs.yml README.md requirements.txt
```

This command prints given files' content separated by their filenames. Uses `tail` command to print
the filename before printing the file content.

This command is useful for legal purposes and passing your project to a LLM.

??? info "`tail -n`"

    `-n +NUM` to skip NUM-1 lines at the start (Instead of printing just last 10 lines).

## Examples

### Write all files in a directory recursively to a single file

```console
$ tail -n +1 $(find . -type f) > all_files.txt
```

`find . -type -f`: Lists all regular files.

You can use `grep -a "==>" all_files.txt` to check which files' content is written.