---
comments: true
---

# tmux

My most frequently used `tmux` commands and shortcuts.

## Session

```console
$ tmux new -s mysession   # Create a new session
$ tmux ls   # List sessions
$ tmux attach -t mysession   # Attach to a session
$ tmux kill-session -t mysession   # Kill a session
```

++"PREFIX"++ ++"d"++ - Detach from session

++"PREFIX"++ ++"$"++ -> Rename session

## Window

++"PREFIX"++ ++"c"++ - New window

++"PREFIX"++ ++0++...++9++ - Switch to window

++"PREFIX"++ ++comma++ - Rename window

++"PREFIX"++ ++"&"++` - Kill window

## Pane

++"PREFIX"++ ++double-quote++ / ++"PREFIX"++ ++"%"++ - Split pane verically / horizontally

++"PREFIX"++ &lt;arrow keys&gt; - Switch pane

++"PREFIX"++ ++ctrl++ + &lt;arrow keys&gt; - Resize pane

++"PREFIX"++ ++"x"++ - Kill pane

++"PREFIX"++ ++"z"++ - Zoom pane

++"PREFIX"++ ++brace-left++ / ++"PREFIX"++ ++brace-right++ - Move pane

## Copy mode

Enter copy mode by pressing ++"PREFIX"++ ++bracket-left++. Then you can move your cursor with arrow
keys. Press ++ctrl+space++ to start selecting text. Press ++alt+w++ to copy selected text.

You can use ++"PREFIX"++ ++bracket-right++ to paste copied text if ++ctrl+shift+v++ doesn't work.


