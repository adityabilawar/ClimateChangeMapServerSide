//exporting: https://bezkoder.com/node-js-export-mongodb-csv-file/
const express = require('express');

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("./server/data/data.csv");

const router = express.Router();

//get markers
router.get('/', async (req, res) => {
    const posts = await createCSV();
    res.send();
});


function createCSV(data) {
    fastcsv
        .write(data, { headers: true })
        .on("finish", function () {
            console.log("Successful write to data.csv");
        })
        .pipe(ws);
}

module.exports = createCSV;
