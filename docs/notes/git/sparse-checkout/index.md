---
comments: true
mark_as_read:
    updated_at: 2024-07-20
---

# sparse-checkout

Sometimes I need only a small portion of a huge git repository. Cloning (downloading) and updating
whole repository in that situation is just a wast of time. Luckily git allows us to work with only
the data we want from a git repository.

For example [:octicons-mark-github-16:
linuxmint/cinnamon-spices-extensions](https://github.com/linuxmint/cinnamon-spices-extensions)
repository is used to maintain every extension made for Cinnamon Desktop Environment. Let's say we
found a bug in the `horizontal-osd@berk-karaal` extension and want to create a PR to fix it. Does it
mean we have to clone and pull whole other extensions in the repository? No, we will specify git to
which files we want to work with. To do that:

1. Clone repository without any file and no checkout:

    ```console
    $ git clone --filter=blob:none --no-checkout https://github.com/linuxmint/cinnamon-spices-extensions.git
    ```

2. Activate sparse checkout:

    ```console
    $ cd cinnamon-spices-extensions/
    $ git sparse-checkout init
    ```

    ??? info "What is sparse-checkout?"

        Sparse checkout allows users to work with a subset of the repository files. When set, git only
        tracks specified files.

        You can check if sparse-checkout is activated via `$ git config core.sparseCheckout` command.
        This will return `true` if it's activated.

        You may want to read [Cone Mode Handling](https://git-scm.com/docs/git-sparse-checkout#_internalscone_mode_handling)
        (default mode) and [Non-Cone Problems](https://git-scm.com/docs/git-sparse-checkout#_internalsnon_cone_problems)
        sections.


3. Specify which files and directories to include in working tree:

    ```console
    $ git sparse-checkout set horizontal-osd@berk-karaal/
    ```

    ??? info "More on `sparse-checkout set`"

        You can pass multiple directories or files as arguments in this command.

        Selected files are stored in `.git/info/sparse-checkout` file. You can edit this file in
        `.gitignore` format.

        As you can see in the `.git/info/sparse-checkout` file, git will get all the files in the
        root path by default (`/README.md` for example). If you want to avoid that, check out
        `sparse-checkout init --no-cone` option.

4. Checkout to the preferred branch:

    ```console
    $ git checkout master
    ```

    This will pull files selected with sparse-checkout from given branch.

---

**PS:**

- Checkout these commands:
    - `sparse-checkout init --no-cone`
    - `sparse-checkout list`
    - `sparse-checkout disable`
- [git-scm.com/docs/git-sparse-checkout](https://git-scm.com/docs/git-sparse-checkout)
