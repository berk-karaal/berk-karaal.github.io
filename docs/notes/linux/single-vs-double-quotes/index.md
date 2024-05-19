---
comments: true
---

# Single vs Double Quotes

Single quotes (`''`) and double quotes (`""`) in Bash are not the same thing!

String inside single quotes is treated as literal string. Variable expansion or command
substitution **won't** happend inside single quotes.

Example:
```bash
$ echo "$(date)"
Sun May 19 03:52:50 PM +03 2024
$ echo '$(date)'
$(date)
```

More:
[stackoverflow.com/questions/6697753/what-are-the-differences-between-single-and-double-quotes-in-bash](https://stackoverflow.com/questions/6697753/what-are-the-differences-between-single-and-double-quotes-in-bash)