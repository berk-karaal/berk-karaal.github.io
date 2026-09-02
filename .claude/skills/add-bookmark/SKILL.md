---
name: add-bookmark
description: Use when adding a bookmark (a URL, tool, website, library, or tech finding) to the bookmarks page of the berk-karaal.github.io (berkkaraal.com) site — the user gives a link and/or a short note and wants it recorded in bookmarks/bookmarks.yml and published.
---

# Adding a Bookmark

## Overview

Bookmarks live in `bookmarks/bookmarks.yml`, rendered on `/bookmarks/` by the
`materialx-bookmarks` plugin (configured in `properdocs.yml`). Adding one means: generate the
entry, preview it for approval, prepend it to the file, validate the YAML, commit, push to main.
Pushing to main deploys the site directly — there is no PR preview.

## Workflow

### 1. Sync with remote

Before editing anything, make sure the local `main` branch is up to date:

```bash
git pull --ff-only
```

Never force push. If the pull fails because of local divergence, stop and report it instead of
rewriting history.

### 2. Gather content

Fetch the given URL with WebFetch and base the title and description on the actual page. Run a
WebSearch on the tool/site name as well when the page alone doesn't make its purpose clear. If
the fetch fails, rely on web search plus whatever the user said, and mention in the preview that
the page could not be fetched.

- **Title**: the project/site's own name (e.g. repo name, product name). Keep the user's phrasing
  if they supplied one.
- **Description**: one or two short sentences explaining what the tool is and what it's used for.
  Plain wording, no marketing language.

### 3. Pick tags and links

Tags MUST come from the `tags:` list at the top of `bookmarks.yml` — a tag that is not declared
there fails the site build. If none fits, propose a new tag in the preview; it is only created
after approval. When confirmation is skipped, use `Other` instead of inventing a tag.

Link text conventions: `GitHub` for github.com, `Wikipedia` for wikipedia.org, `Website` for
anything else. Multiple links are fine when the user provides them (e.g. Website + GitHub).

### 4. Preview and confirm

Ask for approval with AskUserQuestion (options: approve / edit first). Put the exact YAML entry
(and any proposed new tag) in each option's `preview` field — text printed before the dialog is
hidden behind it, so the preview pane is the only place the user reliably sees the entry. Skip
this step only when the invocation says so ("no confirmation", "just push", etc.).

### 5. Write the entry

Prepend to the **top** of the `bookmarks:` list — newest first. Format, with this exact
indentation:

```yaml
  - title: Subdomain Index
    description: |
        crt.name - Give it an apex domain. You get every subdomain on file, plus the date each name first showed up.
    tags: [Other]
    links:
      - text: Website
        url: https://crt.name/
```

An approved new tag is appended to the top-level `tags:` list.

### 6. Validate

```bash
python3 -c "import yaml; yaml.safe_load(open('bookmarks/bookmarks.yml'))"
```

Must exit 0 before committing. On error, fix the entry and re-run.

### 7. Commit and push

Stage only `bookmarks/bookmarks.yml`, then review `git status` and the staged diff before
committing: no env files, credentials, or out-of-scope files may be included unless the user
explicitly requested them. Commit message follows the existing history style:
`Add <title> to bookmarks`. Push to `main` — never with `--force`.

## Common Mistakes

- **Tag not in the `tags:` list.** An undeclared tag fails the site build.
- **Appending to the bottom.** New entries go at the top of the list.
- **Long or promotional descriptions.** Match the terse tone of existing entries.
- **Committing unrelated files.** Stage `bookmarks/bookmarks.yml` only.
