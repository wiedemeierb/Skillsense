const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET ROUTE FOR ALL MESSAGES
//NEEDS DEVELOPMENT: SHOULD PULL WHERE SENDER OR RECEIVER ID IS THE CURRENT USER, GROUP BY OTHER USER
router.get('/', rejectUnauthenticated, (req, res) => {
	const queryText = `
select messages.id, message, date_time, sId, sName, rId, rName from messages
join (select users.id as sId, users.username as sName from users) AS sent
	ON sent.sId = messages.sender_id
join (select users.id as rId, users.username as rName from users) as recipient
	on recipient.rid = messages.recipient_id
where messages.sender_id = $1 OR messages.recipient_id = $1;`;
	pool.query(queryText, [req.user.id])
		.then(result => {
			let userList = [];
			let counter = 0;
			for (let message of result.rows) {
				if (
					!userList.map(user => user.username).includes(message.rname) &&
					message.rname !== req.user.username
				) {
					userList.push({ id: counter, username: message.rname });
					counter++;
				}
				if (
					!userList.map(user => user.username).includes(message.sname) &&
					message.sname !== req.user.username
				) {
					userList.push({ id: counter, username: message.sname });
					counter++;
				}
			}
			for (let user of userList) {
				user.messages = result.rows.filter(
					message => message.rname === user.username || message.sname === user.username
				);
			}
			res.send(userList);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
});

module.exports = router;
