SURAIMU FINDER
===================
![demo](demo.gif)

:smile: Fast Noto Emoji (KitKat) Finder

Source: [Emoji - Wikimedia Commons](https://commons.wikimedia.org/wiki/Emoji)


## Develop

```sh
# develop server
cd suraimu-finder/
npm install
npm start

# develop client
npm install -g @angular/cli
cd suraimu-finder/client/
npm install
npm start
```


## Deploy

```sh
cd client/
ng build --prod --output-path ../public
cd ../
gcloud app deploy
```