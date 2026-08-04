---
comments: true
---

# curl

Some frequently used curl commands/snippets.

## Response status code and body

=== "bash"

    ```bash
    $ HTTP_CODE=$(curl -sS -o response.json -w "%{http_code}" https://ifconfig.co/json)

    $ echo $HTTP_CODE
    200

    $ cat response.json
    {
      ...
    }
    ```

=== "fish"

    ```fish
    $ set HTTP_CODE (curl -sS -o response.json -w "%{http_code}" https://ifconfig.co/json)

    $ echo $HTTP_CODE
    200

    $ cat response.json
    {
      ...
    }
    ```

- `-s` (`--silent`): Hides the progress meter and noise
- `-S` (`--show-error`): Tells curl that even though it's in silent mode, it should still print an error
message if the connection completely fails (e.g., DNS failure, connection refused).
