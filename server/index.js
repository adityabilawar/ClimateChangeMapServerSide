const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

const nodemailer = require("nodemailer");
const { getMaxListeners } = require('process');

//Middleware
app.use(express.static('src'));
app.use(cors());
app.use(express.json());

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

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist'));
app.use(express.json());


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/index.html'));
  });
  
  app.post('/', (req, res)=>{
        console.log(req.body)
  
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'climapmessage@gmail.com',
            pass: 'peppapigpizza123!'
          }
        })
  
        const mailOptions = {
          from: req.body.email, //sender address
          to: 'climap.org@gmail.com', // list of receivers
          subject: `Message from ${req.body.email}: ${req.body.subject}`, // Subject line
          text: req.body.message
      };
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
      {
        console.log(err);
      } else {
        console.log('Email sent: ' + info.response);
        res.send('success')
      }
  });
  
  })
  


app.listen(port, () => console.log(`server started on port ${port}`));