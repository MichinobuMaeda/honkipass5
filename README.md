# Honkipass v5

Sample: https://honkipass.michinobu.jp/

![本気でパスワード v5](honkipass5.png)

## Prerequisites

-   node >= 20

## Build

```bash
git clone git@github.com:MichinobuMaeda/honkipass5.git
cd honkipass5
npm install
npm run build
npm start
```

## Note

```bash
$ npm create @vite-pwa/pwa@latest honkipass5 -- --template svelte

> npx
> create-pwa honkipass5 --template svelte

✔ PWA Name: … honkipass5
✔ PWA Short Name: … honkipass5
✔ PWA Description: …
✔ Theme color: … #ffffff
✔ Select a strategy: › generateSW
✔ Select a behavior: › Prompt for update
✔ Enable periodic SW updates? … no
✔ Show offline ready prompt? … no
✔ Generate PWA Assets Icons on the fly? … yes

$ cd honkipass5
$ npm install
```

Copy some svelte components from <https://github.com/MichinobuMaeda/coarse-paper>
