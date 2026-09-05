---
comments: true
description: "What visudo does and why the sudoers file should never be edited directly."
---

# visudo

`visudo` is the safe way to edit `/etc/sudoers`, the file that decides who may run `sudo` and
what they may run with it.

```bash
sudo visudo
```

It opens the file in your editor (`$EDITOR`, falling back to `vi`) and does two things a plain
text editor does not:

- **Locks the file** so two people cannot edit it at the same time and clobber each other's
  changes.
- **Checks the syntax before saving.** If the file has an error, `visudo` refuses to install it and
  asks whether you want to re-edit, quit without saving, or force the write anyway.

## Why it exists

`sudo` parses `/etc/sudoers` on every run. A single typo makes the whole file unparseable, and
`sudo` then refuses to work at all. At that point you cannot run `sudo` to fix the file that is
breaking `sudo`. Unless you have a root password or a root shell already open, the only ways out
are single-user mode or a live USB.

`visudo` closes that trap by never letting a broken file reach `/etc/sudoers` in the first place.

## Editing drop-in files

Most distributions include `/etc/sudoers.d/` and it is the preferred place to put your own rules.
`visudo` can edit files there too:

```bash
sudo visudo -f /etc/sudoers.d/mycustomrules
```

You get the same locking and syntax check as for the main file.

## Checking without editing

```bash
sudo visudo -c
```

Parses `/etc/sudoers` and everything in `/etc/sudoers.d/` and reports whether they are valid.
Useful after scripted or configuration-managed changes.
