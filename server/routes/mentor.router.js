const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/all', (req, res) => {
	const queryText = `SELECT * FROM "student_mentor";`;
	pool
		.query(queryText)
		.then(result => {
			res.send(result.rows);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
});

router.get('/pending', (req, res) => {
	//query to get all mentors in system with pending status
	const queryText = `
    SELECT * from users
	JOIN user_type
    ON user_type.id = users.access_id
    JOIN mentor_status
    ON users.approved_mentor = mentor_status.id
	WHERE user_type.access ILIKE 'Mentor' AND mentor_status.status ILIKE 'Pending Approval';`;

	pool
		.query(queryText)
		.then(result => {
			console.log('successful GET of mentors pending approval');
			res.send(result.rows);
		})
		.catch(error => {
			console.log('error on GET of mentors pending approval: ', error);
			res.sendStatus(500);
		});
});

router.patch(`/admin/${id}`, rejectUnauthenticated, (req, res) => {
    //patch route to update mentor approval status
    //expects a req.body with {newStatus: #}
	console.log(req.user);
	const queryText = `UPDATE users SET approved_mentor = $1  WHERE users.id = $2`;
	const values = [req.params.id, req.body.newStatus];

	pool
		.query(queryText, values)
		.then(result => {
			console.log('successful update of mentor status');
			res.sendStatus(200);
		})
		.catch(error => {
			console.log('error updating mentor status: ', error);
			res.sendStatus(500);
		});
});

module.exports = router;
