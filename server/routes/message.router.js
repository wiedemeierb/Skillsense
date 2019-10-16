const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET ROUTE FOR ALL MESSAGES
//NEEDS DEVELOPMENT: SHOULD PULL WHERE SENDER OR RECEIVER ID IS THE CURRENT USER, GROUP BY OTHER USER
router.get('/', rejectUnauthenticated, (req, res) => {
	const queryText = `
select messages.id, message, date_time, sId, sName, rId, rName from messages
join (select users.id as sId, users.username as sName, users.focus_skill as sfocus_skill from users) AS sent
	ON sent.sId = messages.sender_id
join (select users.id as rId, users.username as rName, users.focus_skill as rfocus_skill from users) as recipient
	on recipient.rid = messages.recipient_id
where messages.sender_id = $1 OR messages.recipient_id = $1;`;
	pool.query(queryText, [req.user.id])
		.then(result => {
			console.log(result.rows)
			let userList = [];
			for (let message of result.rows) {
				if (
					!userList.map(user => user.username).includes(message.rname) &&
					message.rname !== req.user.username
				) {
					userList.push({ username: message.rname, id: message.rid, focus_skill: message.rfocus_skill });
				}
				if (
					!userList.map(user => user.username).includes(message.sname) &&
					message.sname !== req.user.username
				) {
					userList.push({ username: message.sname, id: message.sid, focus_skill: message.sfocus_skill });
				}
			}
			for (let user of userList) {
				user.messages = result.rows.filter(
					message => message.rname === user.username || message.sname === user.username
				);
				user.messages.sort((a, b) => b.date_time - a.date_time);
			}
			res.send(userList);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
});

//route to send message to user//
router.post(`/`, (req, res) => {
	const sqlText = `
	INSERT INTO messages
		("sender_id", "recipient_id", "message", "date_time")
	VALUES
		($1, $2, $3, NOW());`;
	const values = [req.user.id, req.body.recipient.id, req.body.message];
	pool.query(sqlText, values)
		.then(result => {
			console.log('successful send new message');
			res.sendStatus(200);
		})
		.catch(error => {
			console.log('error on sending new message: ', error);
			res.sendStatus(500);
		});
});

module.exports = router;
