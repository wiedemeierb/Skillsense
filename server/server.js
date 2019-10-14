const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const jobRouter = require('./routes/job.router');
const mentorRouter = require('./routes/mentor.router');
const messageRouter = require('./routes/message.router');
const userSkillsRouter = require('./routes/userskills.router');
const emailRouter = require('./routes/email.router');
const infoRouter = require('./routes/info.router');
const applicantRouter = require('./routes/applicant.router');
//upload controller for getting the signed url from aws
const aws_sign = require('./upload/controller/controller');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

//use cors for file uploads to AWS cloud
app.use(cors());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/mentors', mentorRouter);
app.use('/api/messages', messageRouter);
app.use('/api/userskills', userSkillsRouter);
app.use('/api/email', emailRouter);
app.use('/api/info', infoRouter);
app.use('/api/upload', aws_sign.sign_s3);
app.use('/api/applicants', applicantRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
