# gpgtar

You can use `gpgtar` command to encrypt a directory with a password.

## Example

```console
$ tree
.
└── super-secret-folder
    ├── launch_codes.md
    ├── other-top-secret-documents
    │   ├── mars.md
    │   └── nixos.md
    └── startup-ideas.md

$ # Encrypt directory
$ gpgtar -e --symmetric -o data.gpg --gpg-args="--pinentry-mode loopback" super-secret-folder/
<give a password>
$ ls
data.gpg  super-secret-folder/

$ # I can remove the unencrypted directory
$ rm -r super-secret-folder/

$ # Decrypt and extract encrypted directory
$ gpgtar -d -C . --gpg-args "--pinentry-mode loopback" data.gpg
<enter the password>
$ tree
.
├── data.gpg
└── super-secret-folder
    ├── launch_codes.md
    ├── other-top-secret-documents
    │   ├── mars.md
    │   └── nix.md
    └── startup-ideas.md
```



## Encrypt an Archive

```console
$ gpgtar -e --symmetric -o data.gpg --gpg-args="--pinentry-mode loopback" mydir
```

This will encrpyt the `mydir` directory and put it into `data.gpg` file. You will use `data.gpg`
file with the password you gave (while running this command) to unpack your data.

Used Args:

- `-e`, `--encrypt`: create an encrypted archive
- `--symmetric`: Encrypt  with a symmetric cipher using a passphrase.
- `--output file`, `-o file`: Write the archive to the specified file **file**.
- `--gpg-args`: Pass the specified extra options to gpg.
    - `--pinentry-mode mode`: Set the pinentry mode to **mode**.<br/>
    (_I use it to type my password in terminal, not from the distracting popup on GNOME. More:
    [askubuntu.com/a/1398757/1357153](https://askubuntu.com/a/1398757/1357153)_)

## Decrypt an Archive

```console
$ gpgtar -d -C . --gpg-args="--pinentry-mode loopback" data.gpg
```

This will decrypt and create the archive encrpyted in `data.gpg`.

Used Args:

- `-d`, `--decrypt`: extract an encrypted archive
- `-C DIRECTORY`, `--directory DIRECTORY`: change to **DIRECTORY** first
- `--gpg-args`: (same as the description in [Encrypt an Archive](#encrypt-an-archive))

---

Thanks [www.baeldung.com/linux/encrypting-decrypting-directory](https://www.baeldung.com/linux/encrypting-decrypting-directory)