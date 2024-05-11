---
comments: true
mark_as_read:
    updated_at: 2024-05-11
---

# Setup Git in a new machine

## Install Git

Go to
[git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Set Global Configs

```bash
$ git config --global user.name "your-username"
$ git config --global user.email "your-email@example.com"
$ git config --global init.defaultBranch main
```

These global configs are stored in `~/.gitconfig` file.

!!! quote "Committer GitHub Account"

    GitHub uses your commit email address to associate commits with your account on GitHub.com.

    \- [docs.github.com](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address)

## Generate ssh key and add it to GitHub

1. **Generate ssh key**

    ```bash
    $ ssh-keygen -t ed25519 -C "your-email@example.com"
    ```

    After you run this command it will ask you a file path to save the key, accept the default path
    by pressing enter. Then it will ask you a passphrase for the key. I strongly suggest you to use
    a passphrase. When you set a passphrase, even if someone gets your private ssh key they won’t be
    able to use it without the passphrase.

    At the end of this command, your private key should be at `~/.ssh/id_ed25519` and public key
    should be at `~/.ssh/id_ed25519.pub`. **Never share your private key!**

2. **Add public ssh key to GitHub**

    In GitHub go to “Settings > SSH and GPG keys” and click “New ssh key”. Give a title (to remember
    the machine which uses this key), select “Authentication Key”, paste your public key (`$ cat
    ~/.ssh/id_ed25519.pub`) and finally click “Add SSH Key” button.

3. **(Optional) Add same public key to GitHub also as “Signing Key”**

    Follow step 2 again but instead of selecting “Authentication Key”, now select “Signing Key”.
    This is used to sign commits.
    
    Difference between “Authentication Key” and “Signing Key”:
    [stackoverflow.com/a/73674287](https://stackoverflow.com/a/73674287)

    Sign your commits with ssh key:
    [docs.gitlab.com](https://docs.gitlab.com/ee/user/project/repository/signed_commits/ssh.html)

4. **Test the connection**

    In order to use ssh keys first you should add them to your ssh-agent. Use `$ ssh-add` command to
    add your keys to the ssh agent. Then use `$ ssh -T git@github.com` command to test your ssh
    connection with GitHub. If it responds with your GitHub username, then you are good to go.

## Managing ssh-agent notes

- Add your ssh keys to the agent: `ssh-add`
- Add a specific key to the agent: `ssh-add ~/.ssh/id_ed25519`
- Remove a ssh key from agent: `ssh-add -d ~/.ssh/id_ed25519`
- List active ssh keys: `ssh-add -l` (Not working great, sometimes still lists ssh keys that are
  removed from agent. 😕)