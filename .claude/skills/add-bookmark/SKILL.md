---
name: add-bookmark
description: Use when adding a bookmark (a URL, tool, website, library, or tech finding) to the bookmarks page of the berk-karaal.github.io (berkkaraal.com) site — the user gives a link and/or a short note and wants it recorded in bookmarks/bookmarks.yml and published.
---

# Adding a Bookmark

## What bookmarks are

The bookmarks page is Berk's public collection of things found on the web that seemed worth
keeping: tools, libraries, websites, articles. Each entry exists so it can be found again later
through the page's search and tag filters, without remembering the exact name.

The page has two readers, and every entry serves both:

- **Berk, months later**, searching for "that terminal file transfer thing". Title, description
  and tags are the search surface, so they must carry the words someone would search for.
- **A visitor** browsing the page cold. The description should let them understand what the
  bookmarked thing is and what it is used for, so they can decide whether to click through.

An entry does its job when a reader who has never heard of the item knows, after one read,
what problem it solves.

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
- **Description**: plain, simple wording that explains what the item is and the use case it
  serves. Lead with the problem it solves or the thing it replaces, then the one or two traits
  that make it worth bookmarking. Short is preferred; a longer description is fine when the item
  is complex and a short one would leave the reader guessing. No marketing language, no feature
  lists copied from the project's README.

### 3. Pick tags and links

Tags are the second search surface after the description: a visitor filters by tag to browse
a category, so pick the tags a reader would expect the item under, not the most specific
possible label.

Tags MUST come from the `tags:` list at the top of `bookmarks.yml` — a tag that is not declared
there fails the site build. If none fits, propose a new tag in the preview; it is only created
after approval. When confirmation is skipped, use `Other` instead of inventing a tag.

Link text conventions: `GitHub` for github.com, `Wikipedia` for wikipedia.org, `Website` for
anything else. Multiple links are fine when the user provides them (e.g. Website + GitHub).

### 4. Preview and confirm

First print the exact YAML entry (and any proposed new tag) as a fenced code block in the chat
message itself, then ask for approval with AskUserQuestion (options: approve / edit first). Also
put the entry in each option's `preview` field. Both are needed: the preview pane can be too
small to show a long entry in full, and the chat message is hidden behind the dialog while it is
open — but it stays readable in the scrollback afterwards. Skip this step only when the
invocation says so ("no confirmation", "just push", etc.).

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
- **Promotional descriptions.** Match the plain tone of existing entries; state what it does.
- **Descriptions that assume the reader knows the item.** A visitor should understand the use
  case without clicking through.
- **Committing unrelated files.** Stage `bookmarks/bookmarks.yml` only.
