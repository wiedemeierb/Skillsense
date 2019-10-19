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
  const sender = 'delaney.sharratt@gmail.com'; //TODO: create SkillSense admin email
  const name = req.body.recipient.username;
  const email = 'd.m.heisel@gmail.com'; //TODO: change to req.body.recipient.email before handoff
  const message = req.body.message;
  const content = `Hello ${name}, \n ${message} \n From, \n SkillSense Administration Team`;
  const mail = {
    from: sender,
    to: email, //Change to email address that you want to receive messages on
    subject: 'Message from SkillSense',
    text: content
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log('error in post', err);
      res.json({
        msg: 'fail'
      });
    } else {
      res.json({
        msg: 'success'
      });
    }
  });
});

module.exports = router;
