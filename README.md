SURAIMU FINDER
===================
![demo](demo.gif)

:smile: Fast Noto Emoji (KitKat) Finder

Source: [Emoji - Wikimedia Commons](https://commons.wikimedia.org/wiki/Emoji)


## Import data (only once)

```sh
export DENO_KV_ACCESS_TOKEN=ddp_***
export DENO_KV_DATABASE_ID=<YOUR_KV_DATABASE_ID_HERE>
deno task importdata
```


## Deploy

```sh
deno task deploy
# or
deno task deploy-prod
```
