const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'delaney.sharratt@gmail.com',
    pass: process.env.GOOGLE_KEY
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/', (req, res, next) => {
  var sender = 'delaney.sharratt@gmail.com';
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var content = `Hello ${name}, \n message: ${message} \n From, \n SkillSense`;
  var mail = {
    from: sender,
    to: email, //Change to email address that you want to receive messages on
    subject: 'Message from SkillSense',
    text: content
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      });
    } else {
      console.log('error in post', err);
      res.json({
        msg: 'success'
      });
    }
  });
});

module.exports = router;
