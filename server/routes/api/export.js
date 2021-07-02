//exporting: https://bezkoder.com/node-js-export-mongodb-csv-file/
const express = require('express');
const fastcsv = require("fast-csv");
const fs = require("fs");
const path = require('path');

const filePath = path.resolve(`${__dirname}/../../data/data.csv`);
const ws = fs.createWriteStream(filePath);

const router = express.Router();

//get markers
router.get('/data', async (req, res) => {
    const posts = await createCSV();
    res.download(filePath);
});

function createCSV(data) {
    const promise = new Promise();
    fastcsv
        .write(data, { headers: true })
        .on("finish", function () {
            promise.resolve();
        })
        .pipe(ws);
    return promise;
}

module.exports = createCSV;
