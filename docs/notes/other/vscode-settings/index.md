---
mark_as_read:
    updated_at: 2026-08-07

comments: true
---

# VSCode Settings

Frequently used VSCode settings I put into `.vscode/settings.json` of my projects.

## File nesting

Nest Go test files under their source file in the explorer.

```json
{
    "explorer.fileNesting.enabled": true,
    "explorer.fileNesting.expand": false,
    "explorer.fileNesting.patterns": {
        "*.go": "${capture}_test.go, ${capture}_bench_test.go"
    }
}
```
