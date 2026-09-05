# berkkaraal.com

Berk Karaal's personal website: notes, blog posts, projects, open source contributions and
public bookmarks. Live at https://berkkaraal.com, served from GitHub Pages.

## Tech stack

- **ProperDocs**: MkDocs-compatible static site generator. Config lives in `properdocs.yml`,
  the CLI is `properdocs`.
- **MaterialX**: fork of Material for MkDocs used as the theme, with `overrides/` for
  template partials. Use materialx documentation for usage details: https://jaywhj.github.io/mkdocs-materialx/
- Plugins: blog, tags, social cards, document-dates, mark-as-read, glightbox,
  materialx-bookmarks. Pinned in `requirements.txt`.
- Custom CSS and JS live under `docs/assets/`.

## Layout

- `docs/notes/` short technical notes, one directory per note with an `index.md`
- `docs/blog/posts/` blog posts
- `docs/projects/`, `docs/contributions/` static pages
- `bookmarks/bookmarks.yml` source for the bookmarks page

Navigation is explicit in `properdocs.yml`; nothing is auto-discovered.

## Commands

```bash
uv venv .venv && uv pip install --python .venv/bin/python -r requirements.txt
.venv/bin/properdocs build --strict   # must pass before committing
just serve                            # dev server on localhost:8000, needs the venv activated
```

## Deploy

Pushing to `main` builds and deploys the site through `.github/workflows/github-pages.yml`.
There is no preview environment, so the local strict build is the only check before going live.
Ask before pushing.

## Content rules

- Content is written in English unless stated otherwise.
- Use the `adding-a-note` and `add-bookmark` skills for their respective tasks; they cover the
  files that must change together.
