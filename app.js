const express = require('express');
const app = express();
const datastore = require('@google-cloud/datastore')();

app.get('/find', (req, res) => {
    const keyword = req.param('q');
    if (!keyword) {
        return res.status(406).send();
    }
    const query = datastore.createQuery('Emoji')
        .filter('keywords', '>=', keyword)
        .filter('keywords', '<', keyword + "\ufffd")
    datastore.runQuery(query, (err, entities) => {
        res.json(entities);
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`listening on 0.0.0.0: ${PORT}...`);
});