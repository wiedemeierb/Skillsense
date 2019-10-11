const express = require('express');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
	// Send back user object from the session (previously queried from the database)
	res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
	const password = encryptLib.encryptPassword(req.body.password);
	const values = [
		req.body.username,
		req.body.email,
		password,
		req.body.location,
		req.body.userType,
		req.body.focus_skill,
		req.body.bio,
		req.body.linkedin_url,
		req.body.github_url,
		req.body.website_url
	];

	const queryText =
		'INSERT INTO "users" (username, email, password, location, access_id, focus_skill, bio, linkedin_url, github_url, website_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
	pool
		.query(queryText, values)
		.then(result => {
			console.log('successful insert into users db table, new user registered');
			res.sendStatus(201);
		})
		.catch(error => {
			console.log('error on registering new user: ', error);
			res.sendStatus(500);
		});
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.get('/username/:email', (req, res) => {
	const sqlText = `SELECT username from users where email = $1`;
	pool
		.query(sqlText, [req.params.email])
		.then(result => {
			// console.log('successful get of username from db table based on email ');
			res.send(result.rows[0].username);
		})
		.catch(error => {
			console.log(
				'error on get of username from db table based on email: ',
				error
			);
			res.sendStatus(500);
		});
});

router.post('/login', userStrategy.authenticate('local'), (req, res) => {
	res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
	// Use passport's built-in method to log out the user
	req.logout();
	res.sendStatus(200);
});

//route to get SELECTED user's information
router.get('/specific/:id', (req, res) => {
	const userId = req.params.id;
	const sqlText = `SELECT
		users.id,
		users.username,
		users.email,
		users.location,
		users.focus_skill,
		users.bio,
		users.github_url,
		users.linkedin_url,
		users.website_url,
		users.access_id,
		users.active,
		user_type.user_type
	FROM
		users
	LEFT JOIN
		user_type
			ON
		user_type.id = users.access_id
	WHERE users.id = $1
	GROUP BY
		users.id,
		users.username,
		users.email,
		users.location,
		users.focus_skill,
		users.bio,
		users.github_url,
		users.linkedin_url,
		users.website_url,
		users.access_id,
		users.active,
		user_type.user_type;`;

	pool
		.query(sqlText, [userId])
		.then(result => {
			console.log('specific user details retrieved from database');
			res.send(result.rows[0]);
		})
		.catch(error => {
			console.log(
				'error on retrieving specific user details from database: ',
				error
			);
			res.sendStatus(500);
		});
});

//PUT ROUTE FOR EDITING USER PROFILE
router.put('/edit/:id', (req, res) => {
	// console.log(req.body)
	const queryText = `UPDATE "users" SET
	"email" = $1,
	"focus_skill" = $2,
	"github_url" = $3,
	"linkedin_url" = $4,
	"location" = $5,
	"username" = $6,
	"website_url" = $7,
	"bio" = $8
	WHERE "id" = $9;`;
	pool
		.query(queryText, [
			req.body.email,
			req.body.focus_skill,
			req.body.github_url,
			req.body.linkedin_url,
			req.body.location,
			req.body.username,
			req.body.website_url,
			req.body.bio,
			req.body.id
		])
		.then(result => {
			res.send(result.rows);
		})
		.catch(error => {
			console.log('error with student edit put', error);
			res.sendStatus(500);
		});
});

module.exports = router;
