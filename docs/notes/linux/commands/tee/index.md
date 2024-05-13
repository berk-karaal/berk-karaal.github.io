---
comments: true
---

# tee

`tee` command is used for writing terminal outputs of a command to a file **while still printing the
output on screen**.

<figure markdown="span">
    ![tee wiki image](tee-wiki-image.png)
    <figcaption>Source: [tee command Wikipedia page](https://en.wikipedia.org/wiki/Tee_(command))</figcaption>
</figure>


!!! info

    If you just want to write outputs to a file and don't need to print while doing it, consider
    using `>` or `>>` operators.

## Simple Example

```bash title="bash"
$ while true; do date; sleep 1; done | tee output.txt
```

This command will print date for every second and write the outputs to `output.txt` until you
interrupt.

Instead of writing over the file, you can tell `tee` to append to the file with `-a` option.

!!! tip "Add date to your output file names"

    When running tee command multiple times, you may want to separate outputs. Command substitution
    with `date` command can help you with that:

    ```bash
    $ while true; do date; sleep 1; done | tee output-$(date +"%FT%H:%M:%S").txt
    ```

## Python Outputs

If you want to use `tee` command for Python scripts you should use unbuffered stream mode with `-u`
option.

Try with this example:

```python title="program.py"
import time

for i in range(25):
    time.sleep(0.1)
    print(i)
```

When you try to run this program with `$ python3 program.py | tee py_output.txt`, it won't print
anything to screen or write anything to file until program completed.

When you try it again with `-u` option as `$ python3 -u program.py | tee py_output.txt`, you will
see everything works fine.

## Capture Error Outputs

By default `tee` only captures stdout and not stderr. In order to also capture stderr you should
redirect stderr to stdout with `2>&1`.

```python title="program.py"
import time

for i in range(25):
    time.sleep(0.1)
    print(i)

raise Exception("Can you see me in the output file?")
```

When you run this program without redirection as `$ python3 -u program.py | tee py_output.txt`, you
won't be able to see exception message in the output file.

When you redirect stderr to stdout as `$ python3 -u program.py 2>&1 | tee py_output.txt`, now you
will see exception message in the output file.