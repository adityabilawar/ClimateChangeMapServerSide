//exporting: https://bezkoder.com/node-js-export-mongodb-csv-file/

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("data.csv");

export default function createCSV(data) {
    fastcsv
        .write(data, { headers: true })
        .on("finish", function () {
            console.log("Successful write to data.csv");
        })
        .pipe(ws);
}
