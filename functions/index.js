const functions = require('firebase-functions');
const datastore = require('@google-cloud/datastore')();

exports.findEmoji = functions
    .https
    .onRequest((req, res) => {
        const keyword = req.query.q;
        if (!keyword) {
            return res.status(406).send();
        }
        const query = datastore.createQuery('Emoji')
            .filter('keywords', '>=', keyword)
            .filter('keywords', '<', keyword + "\ufffd")
        datastore.runQuery(query, (err, entities) => {
            if (err) {
                console.error(err);
                return res.status(500).send();
            }
            res.json(entities);
        });
    });
