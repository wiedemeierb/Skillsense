const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET ROUTE FOR ALL MESSAGES

router.get('/', rejectUnauthenticated, (req, res) => {
	const queryText = `
select messages.id, message, date_time, sId, sName, sfocus_skill, rId, rName, rfocus_skill from messages
join (select users.id as sId, users.username as sName, users.focus_skill as sfocus_skill from users) AS sent
	ON sent.sId = messages.sender_id
join (select users.id as rId, users.username as rName, users.focus_skill as rfocus_skill from users) as recipient
	on recipient.rid = messages.recipient_id
where messages.sender_id = $1 OR messages.recipient_id = $1 ORDER BY date_time DESC;`;
	pool.query(queryText, [req.user.id])
		.then(result => {
			let userList = [];
			for (let message of result.rows) {
				if (
					!userList.map(user => user.username).includes(message.rname) &&
					message.rname !== req.user.username
				) {
					userList.push({
						username: message.rname,
						id: message.rid,
						focus_skill: message.rfocus_skill
					});
				}
				if (
					!userList.map(user => user.username).includes(message.sname) &&
					message.sname !== req.user.username
				) {
					userList.push({
						username: message.sname,
						id: message.sid,
						focus_skill: message.sfocus_skill
					});
				}
			}
			//sort messages on each user into date_time order by most recent
			for (let user of userList) {
				user.messages = result.rows.filter(
					message => message.rname === user.username || message.sname === user.username
				);
				user.messages.sort((a, b) => b.date_time - a.date_time);
			}
			res.send(userList);
		})
		.catch(error => {
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
			res.sendStatus(200);
		})
		.catch(error => {
			console.log('error on sending new message: ', error);
			res.sendStatus(500);
		});
});

//route to get invite message to mentor -  should be last message received by mentor from student
router.get('/last/:id', (req, res) => {
	const sqlText = `SELECT * FROM messages WHERE recipient_id = $1 AND sender_id = $2 ORDER BY date_time DESC LIMIT 1;`;
	const values = [];
	if (req.user.user_type === 'Mentor') {
		values.push(req.user.id, req.params.id);
	} else if (req.user.user_type === 'Student') {
		values.push(req.params.id, req.user.id);
	}

	pool.query(sqlText, values)
		.then(result => {
			res.send(result.rows[0]);
		})
		.catch(error => {
			console.log('error on getting invite message from student: ', error);
			res.sendStatus(500);
		});
});

module.exports = router;
