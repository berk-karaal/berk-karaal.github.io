---
mark_as_read:
    updated_at: 2024-09-20

comments: true
---

# Disable CORS on Chrome

You can disable CORS error on Chromium based browsers. This is useful when the server you are using
doesn't have proper CORS configuration yet. Instead of being blocked or having to use a proxy
server, you can disable CORS on your browser to continue development.

!!! danger "Do not use this except for development purposes"
    
    Disabling CORS is a security risk. Do not disable it unless you are sure what you are doing.

To disable CORS on Chrome, start the browser with the following command:

```console
$ google-chrome --disable-web-security --user-data-dir="./chrome-no-cors-user-dir"
```

!!! quote "What is `user-data-dir`?"
    
    The user data directory contains profile data such as history, bookmarks, and cookies, as well as
    other per-installation local state.

    Source:
    [chromium.googlesource.com/chromium/src.git/+/HEAD/docs/user_data_dir.md](https://chromium.googlesource.com/chromium/src.git/+/HEAD/docs/user_data_dir.md)
