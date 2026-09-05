---
comments: true
description: "What the something.d directory convention is, why it exists, and which tools use it."
---

# Drop-in Config Directories

Many Linux programs read one main config file plus every file inside a companion directory
named `something.d`, then merge them all. The `.d` suffix just means "directory". This is the
drop-in directory convention. It started with `init.d` and `cron.d` and has since spread to most
of the system.

```
/etc/sysctl.conf        # main file
/etc/sysctl.d/          # drop-in directory
├── 10-default.conf
├── 50-coredump.conf
└── 99-mine.conf
```

## Why it exists

A single config file has an ownership problem. The distro ships it, the package manager wants to
update it, other packages want to add their own settings to it, and you want to edit it. Everyone
touching the same file leads to `.rpmnew` and `.dpkg-dist` leftovers after upgrades, and to
install scripts that try to `sed` lines into place.

With a drop-in directory each party owns its own file. The package manager can replace its files
freely, you own yours, and nothing steps on anything else. Removing a setting means deleting a
file, not hunting for a line.

## Common rules

Details vary between tools, but most implementations share the same shape:

- **Alphabetical order.** Files are read sorted by name, so numeric prefixes like `10-`, `50-`,
  `90-` control precedence. When the same key appears twice, the later file wins.
- **Vendor vs local.** Distro defaults live under `/usr/lib/` or `/usr/share/`, local overrides
  under `/etc/`. A file in `/etc/` with the same name as one in `/usr/lib/` masks it completely.
  Symlinking that name to `/dev/null` in `/etc/` is the usual way to disable a vendor file.
- **Extension filter.** Only files with the expected extension (`.conf`, `.repo`, `.list`, ...)
  are read, so a stray `.bak` or editor swap file is ignored.
- **Section header.** Some tools need the file to start with a section header so the parser knows
  where the keys belong, like `[main]` for dnf.

## Where you will see it

Kernel and boot:

- `/etc/sysctl.d/`, `/etc/modprobe.d/`, `/etc/modules-load.d/`
- `/etc/udev/rules.d/`, `/etc/tmpfiles.d/`

systemd:

- `/etc/systemd/system/foo.service.d/override.conf` patches a unit without copying the whole
  file. `systemctl edit foo` creates this for you.
- `/etc/environment.d/`

Login and shell:

- `/etc/sudoers.d/`, `/etc/pam.d/`, `/etc/profile.d/`
- `~/.config/fish/conf.d/` is the same idea in user space

Package managers:

- `/etc/yum.repos.d/` and `/etc/dnf/libdnf5.conf.d/` for dnf
- `/etc/apt/sources.list.d/` and `/etc/apt/apt.conf.d/` for apt

SSH:

- `/etc/ssh/sshd_config.d/` and `~/.ssh/config.d/`, pulled in by an `Include` line in the main
  file

## Why it matters for dotfiles

A symlink dropped into a `.d` directory adds one file that nothing else claims. The package
manager will never overwrite it, and it survives upgrades of the main config. Whenever a tool
supports a drop-in directory, reach for it first. If it has no drop-in directory, the next best
option is an `Include` directive in the main file. Only when neither exists do you take over the
main file itself.
