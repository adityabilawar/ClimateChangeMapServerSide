const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

//const nodemailer = require("nodemailer");


//Middleware
//app.use(express.static('src'));
app.use(express.json());
app.use(cors());


const markers = require('./routes/api/markers');
const download = require('./routes/api/export');
app.use('/api/markers', markers);
app.use('/api/download', download);

//handle production
if (process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + '/dist/'));

    //handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'))
}

const port = process.env.PORT || 5000;
  


app.listen(port, () => console.log(`server started on port ${port}`));