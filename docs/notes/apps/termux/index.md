---
mark_as_read:
    updated_at: 2026-09-04

comments: true
---

# Termux

Install the termux app from the
[F-Droid](https://f-droid.org/en/packages/com.termux/) or GitHub releases.
[Why?](https://github.com/termux/termux-app#google-play-store-experimental-branch)

## Install Nerd Font

Do it inside the termux shell, not in ssh.

```shell
pkg install wget unzip
cd ~
wget https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip
unzip JetBrainsMono.zip -d jbmono
cp jbmono/JetBrainsMonoNerdFontMono-Regular.ttf ~/.termux/font.ttf
termux-reload-settings
```

## Update Extra Keys (Termux buttons on the screen)

```properties title="~/.termux/termux.properties"
# Each array item is a row in the termux screen
# First row: General Keyboard Buttons
# Second row: herdr actions
extra-keys = [[ \
 {key: ESC}, \
 {key: TAB}, \
 {key: CTRL}, \
 {key: ALT}, \
 {key: SHIFT}, \
 {key: LEFT, popup: {key: HOME}}, \
 {key: DOWN, popup: {key: PGDN}}, \
 {key: UP, popup: {key: PGUP}}, \
 {key: RIGHT, popup: {key: END}} \
],[ \
 {macro: "CTRL b p", display: "◀tab"}, \
 {macro: "CTRL b n", display: "tab▶"}, \
 {macro: "CTRL b g", display: "☰"}, \
 {macro: "CTRL b q", display: "detach"}, \
 {macro: "CTRL b", display: "prefix"} \
]]
```

Then you need to run `termux-reload-settings`
