---
name: adding-a-note
description: Use when adding, publishing, renaming, moving, or deleting a note under docs/notes/ in the berk-karaal.github.io ProperDocs/MkDocs site — covers the nav entry, the two "Latest Notes" lists, frontmatter, and the strict build check that must pass before commit.
---

# Adding a Note to the Site

## What notes are

Notes are things Berk recently learned and found worth sharing: a command, a git feature, a
Linux convention, an app setup. They are written once and kept as a reference, so each one
should leave the reader having learned something concrete they can use.

**Reader.** Someone with basic technical background, comfortable in a terminal. Do not explain
what a shell, a config file or a git commit is. Do explain the thing the note is about, from the
angle of why it exists and when you would reach for it.

**Tone.** Plain, pragmatic, casual, straight to the point. First person is normal ("I run into
`~1` and `^1` used interchangeably and never understood the difference"). Open with the real
situation that made the topic matter, then get to the answer. A **TLDR;** line near the top is
welcome for longer notes. No filler, no marketing, no restating the obvious.

**Real examples.** Every note shows the thing actually being used. Prefer real terminal sessions
in `console` blocks with `$` prompts and real output over abstract descriptions. When a command
has flags, follow the example with a short list explaining each flag used. Real-world scenarios
beat toy ones: the sparse-checkout note uses an actual upstream repo, the gpgtar note shows the
full encrypt, delete, decrypt round trip.

**Gotchas.** Things that bite are part of the content, not an afterthought: "do this inside the
termux shell, not over ssh", "Python needs `-u` or `tee` shows nothing until exit". Put them
where the reader hits them, as an admonition when they need to stand out.

**Formatting toolkit** already used across notes, pick what fits:

- `!!! info`, `!!! tip`, `!!! warning` admonitions for side notes and gotchas
- `??? info "title"` collapsible blocks for background the reader can skip
- `=== "bash"` / `=== "fish"` tabs when the same snippet differs per shell
- `title="path/to/file"` on code fences that show a file
- Links to the source that taught it: man pages, official docs, a Stack Overflow answer

**Length** follows the topic. A three-sentence note with a screenshot and a repo link is fine
for a tool recommendation; a conceptual note can run several screens. Stop when the reader has
what they need.

Read two or three existing notes under `docs/notes/` before writing to match the voice.

## Overview

A note is not one file. Creating `docs/notes/.../index.md` and stopping leaves the page
unreachable from the menu and invisible on both "Latest Notes" lists. Four places must agree.

## The Four Places

| # | File | What to do |
|---|------|-----------|
| 1 | `docs/notes/<category>/<slug>/index.md` | The note itself |
| 2 | `properdocs.yml` → `nav:` | Add entry — nav is **explicit**, nothing is auto-discovered |
| 3 | `docs/notes/index.md` → `## Latest Notes` | Prepend link (newest first, full list) |
| 4 | `docs/index.md` → Latest Notes card | Prepend link, drop oldest to keep 5 |

## 1. The Note File

Always a directory with `index.md` (never a bare `.md` — the only exception in the repo is the
legacy `docs/notes/git/setup.md`). Directory name is the URL slug: lowercase, hyphenated.

```markdown
---
comments: true
---

# curl

Some frequently used curl commands/snippets.
```

Optional frontmatter, both used in the repo:

- `description: "..."` — meta description / social card text
- `mark_as_read:` / `    updated_at: YYYY-MM-DD` — renders the "mark as read" button
  (`overrides/partials/mark-as-read-button.html`). Set the date with `date +%F`.

Put images next to `index.md` and reference them relatively.

## 2. nav in properdocs.yml

Every note needs a nav entry or it is unreachable from the menu. The pattern nests the display
name over the file:

```yaml
          - Commands:
              - curl:
                  - notes/linux/commands/curl/index.md
              - dust:
                  - notes/linux/commands/dust/index.md
```

Paths are relative to `docs/`. Keep siblings alphabetical.

## 3. docs/notes/index.md

Prepend to `## Latest Notes`. Icon matches the category — copy from a sibling entry:

| Category | Icon |
|---|---|
| Linux | `:fontawesome-brands-linux:` |
| Git | `:fontawesome-brands-git-alt:` |
| Python | `:fontawesome-brands-python:` |
| Other | `:fontawesome-solid-file-lines:` |

```markdown
:fontawesome-brands-linux: [ Linux / Commands / curl](./linux/commands/curl/index.md)
{.note-link}
```

The `{.note-link}` line is required — it carries the hover animation. The leading space inside
the link text is intentional (spacing after the icon).

## 4. docs/index.md Home Card

Prepend inside the Latest Notes card. Different syntax from #3 — `:notepad_spiral:` inside the
link, no `{.note-link}`:

```markdown
    [:notepad_spiral: Linux / Commands / curl](./notes/linux/commands/curl/index.md)
```

Card holds 5. Remove the oldest so it stays balanced with the Latest Blogs card next to it.

## Verify Before Commit

```bash
.venv/bin/properdocs build --strict   # must exit 0; --strict turns broken links into errors
just serve                            # visual check at localhost:8000
```

`--strict` catches the most common mistake: a wrong relative path in one of the two Latest
Notes lists. It does **not** catch a missing nav entry — check that by eye.

Pushing to `main` triggers `.github/workflows/github-pages.yml`, which builds and deploys.
There is no PR preview, so the local strict build is the only gate.

## Moving / Renaming / Deleting

Same four places. A moved note changes its URL — the old URL 404s, and any cross-note link to
it breaks. `--strict` will catch in-repo breakage; external inbound links it cannot.

## Common Mistakes

- **Note file only.** Page builds, nothing links to it. Nav is explicit — always edit `properdocs.yml`.
- **Updated one Latest Notes list, not both.** They are separate files with different syntax.
- **Forgot `{.note-link}`** in `docs/notes/index.md` — entry renders but loses the hover style.
- **Home card grew past 5.** Drop the oldest entry.
- **Bare `.md` instead of a directory.** Breaks the slug convention and leaves nowhere for images.
