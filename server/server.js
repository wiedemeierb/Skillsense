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
const emailRouter = require('./routes/email.router');

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
app.use('/api/userskills', userSkillsRouter);
app.use('/api/email', emailRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
