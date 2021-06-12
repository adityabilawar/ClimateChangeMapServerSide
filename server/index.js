const express = require('express');
const cors = require('cors');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

const markers = require('./routes/api/markers');

app.use('/api/markers', markers);

//handle production
if (process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + './dist/'));

    //handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + './dist/index.html'))
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));