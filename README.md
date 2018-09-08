SURAIMU FINDER
===================
![demo](demo.gif)

:smile: Fast Noto Emoji (KitKat) Finder

Source: [Emoji - Wikimedia Commons](https://commons.wikimedia.org/wiki/Emoji)


## Develop

```sh
npm install
npm start
```


## Deploy

### Import seed (only once)

```sh
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/datastore-owner-service-account-key.json
cd functions
npm install
node build.js
```

### Deploy to Firebase hosting

```sh
npm install -g @angular/cli firebase-tools
ng build --prod --output-path public
firebase deploy
```