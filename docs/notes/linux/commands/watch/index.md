---
comments: true
---

# watch

Execute command at regular intervals. It also shows the output of every run.

`$ watch -n <SECONDS> <YOUR COMMAND TO EXECUTE>`

`$ watch -n 1 date`

`-t` -> Turn  off  the header showing the interval. <br>
`-d` -> Highlight  the differences between successive updates.

More: [www.baeldung.com/linux/watch-command](https://www.baeldung.com/linux/watch-command)

## Save outputs to a file with date (Example)

You can do something like below to run your command every second and save all outputs to a file with
execution date on top while still printing output to screen:

`#!bash $ watch -n 1 'echo -e "- $(date)\n$(YOUR COMMAND)\n" | tee -a outputs.txt'`

> Use may use `free` for `YOUR COMMAND` to see how it works.

??? warning "Pay attention to usage of single quotes and double quotes" 

    We don't want to execute `date` and `YOUR COMMAND` before passing them to `watch` command.
    Instead, we want them to be executed by `watch` command. Therefore we use single quotes to pass
    our command as literal string to `watch`.

    More: [Single vs Double Quotes](../../single-vs-double-quotes/index.md)

The output will be something like this:

```title="outputs.txt"
- Sun May 19 12:44:00 AM +03 2024
<YOUR COMMAND OUTPUT>

- Sun May 19 12:44:01 AM +03 2024
<YOUR COMMAND OUTPUT>

- Sun May 19 12:44:02 AM +03 2024
<YOUR COMMAND OUTPUT>
```

