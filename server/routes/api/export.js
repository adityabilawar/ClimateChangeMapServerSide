//exporting: https://bezkoder.com/node-js-export-mongodb-csv-file/

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("bezkoder_mongodb_fastcsv.csv");

const data = ...;

fastcsv
    .write(data, { headers: true })
    .on("finish", function () {
        console.log("Write to bezkoder_mongodb_fastcsv.csv successfully!");
    })
    .pipe(ws);