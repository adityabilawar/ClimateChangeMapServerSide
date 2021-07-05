//exporting: https://bezkoder.cyom/node-js-export-mongodb-csv-file/
const express = require('express');
const fastcsv = require('fast-csv');
const fs = require('fs');
const path = require('path');

const markers = require('./markers');

const folderName = 'c:/Users/Aditya/Documents/ClimateChangeMapServerSide/server/data'

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}

const filePath = path.resolve(`${__dirname}/../../data/data.csv`);
const ws = fs.createWriteStream(filePath);

const router = express.Router();

console.log('HELLO');

//get markers
router.get('/', async (req, res) => {
    console.log('getting markers');
    const result = await markers.loadMarkers();
    console.log(result);
    const data = Array.prototype.slice.call(res, 0);
    // console.log(data);
    await createCSV(data);
    res.download(filePath);
});

function createCSV(data) {
    return new Promise(resolve => {
        console.log('Creating file');
        try {
            fastcsv
                .write(data, { headers: true })
                .on('finish', function () {
                    console.log('Finished creating file');
                    resolve();
                })
                .pipe(ws);
        } catch (error) {
            console.log(error);
        }

    });
}

module.exports = router;