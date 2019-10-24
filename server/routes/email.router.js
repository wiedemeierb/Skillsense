const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.NODE_MAILER_USER,
		pass: process.env.NODE_MAILER_USER_KEY
	}
});

transporter.verify((error, success) => {
	if (error) {
		console.log('Error in preparing nodemailer for messaging: ', error);
	} else {
		console.log('Server is ready to take messages');
	}
});

router.post('/', (req, res, next) => {
	const sender = process.env.NODE_MAILER_USER; //TODO: create SkillSense admin email to send from
	const name = req.body.recipient.username;
	const email = req.body.recipient.email;
	const message = req.body.message;
	const content = `Hello ${name}, \n ${message} \n From, \n SkillSense Administration Team`;
	const mail = {
		from: sender,
		to: email,
		subject: 'Message from SkillSense',
		text: content
	};
	transporter.sendMail(mail, (err, data) => {
		if (err) {
			console.log('Error in sending email: ', err);
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
