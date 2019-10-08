const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const jobRouter = require('./routes/job.router');
const mentorRouter = require('./routes/mentor.router');
const messageRouter = require('./routes/message.router');
const skillRouter = require('./routes/skill.router');
const userSkillsRouter = require('./routes/userskills.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/mentors', mentorRouter);
app.use('/api/messages', messageRouter);
app.use('/api/skills', skillRouter);
app.use('/api/userskills', userSkillsRouter)

// Serve static files
app.use(express.static('build'));

//nodemailer
// const nodemailer = require('nodemailer');
// async function main () {
//   let testAccount = await nodemailer.createTestAccount();
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 465,
//     secure: true,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass
//     }
//   })
//   let info = await transporter.sendMail({
//     from: '"Allyson Holdahl" <allyson.holdahl@gmail.com>',
//     to: '"Delaney Sharrat" <laneymckee@gmail.com>',
//     subject: 'Nodemailer Test',
//     text: 'Hello World',
//     html: '<b>Hello World</b>'
//   })
//   console.log('message sent:', info.messageId)
//   console.log('Preview URL:', nodemailer.getTestMessageUrl(info))
// }
// main.catch(console.error);

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'allyson.holdahl@gmail.com',
    pass: process.env.GOOGLE_KEY
  }
});

let mailOptions = {
  from: 'allyson.holdahl@gmail.com',
  to: 'allyson.holdahl@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
