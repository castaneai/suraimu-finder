const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const flatMap = require('flatmap');
const datastore = require('@google-cloud/datastore')();

const kind = 'Emoji';

async function save() {
    const res = await request.get('https://commons.wikimedia.org/wiki/Emoji');
    fs.writeFileSync('res.html', res);
}

function createDatastoreEntity(item) {
    return {
        key: datastore.key([kind, item.text]),
        data: item,
    }
}

function extractKeywords(desc) {
    const m = desc.match(/(.+)\((.+)\)/);
    if (m && m[1] && m[2]) {
        return m[1].split(' ')
            .concat(flatMap(m[2].split(','), v => v.split(' ')))
            .map(k => k.toLowerCase().trim())
            .filter(k => k !== "") // reject empty
            .filter((k, i, self) => self.indexOf(k) === i) // unique
    }
    return [];
}

async function scrape() {
    const res = await fs.readFileSync('res.html');
    const $ = cheerio.load(res);
    return $('table tbody tr').map((_, elem) => {
        const desc = $(elem).children('td').eq(1).text();
        const text = $(elem).children('td').eq(2).text().trim();
        const src = $(elem).children('td').eq(6).find('img').attr('src');
        if (!src) {
            return null;
        }
        return {
            'text': text,
            'description': desc,
            'keywords': [text].concat(extractKeywords(desc)),
            'thumbnail_url': src,
            'url': src.replace('48px-', '512px-'),
        }
    }).get();
}

function createChunks(arr, size) {
    var res = [];
    for (let i = 0; i < arr.length; i += size) {
        res.push(arr.slice(i, i + size));
    }
    return res;
}

// save();
(async () => {
    const rows = await scrape();
    const entities = rows.map(createDatastoreEntity);
    createChunks(entities, 500).forEach(ets => {
        datastore.save(ets, (err, resp) => {
            if (err) {
                console.error(err);
            }
            console.log(resp);
        });
    });
})();