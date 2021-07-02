const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

const nodemailer = require("nodemailer");
const { getMaxListeners } = require('process');

//Middleware
//app.use(express.static('src'));


// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist'));
app.use(express.json());

// send the user to index html page in spite of the url
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

app.listen(port);