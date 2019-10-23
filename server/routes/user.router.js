const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
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
	pool.query(queryText, values)
		.then(result => {
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
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
	res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
	// Use passport's built-in method to log out the user
	req.logout();
	res.sendStatus(200);
});

//PUT ROUTE FOR EDITING USER PROFILE
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
	if (req.user.id === Number(req.params.id)) {
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
		pool.query(queryText, [
			req.body.email,
			req.body.focus_skill,
			req.body.github_url,
			req.body.linkedin_url,
			req.body.location,
			req.body.username,
			req.body.website_url,
			req.body.bio,
			req.user.id
		])
			.then(result => {
				res.send(result.rows);
			})
			.catch(error => {
				console.log('error with student edit put', error);
				res.sendStatus(500);
			});
	} else {
		console.log('you are not authorized to edit this user');
		res.sendStatus(403);
	}
});

//GET ROUTE for SELECTED user's information
router.get('/specific/:id', rejectUnauthenticated, (req, res) => {
	const sqlText = () => {
		if (req.user.user_type === 'Mentor') {
			return `SELECT
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
		user_type.user_type,
		requested.accepted,
		json_agg(job_applicants) as job_list
	FROM
		users
	LEFT JOIN
		user_type
			ON
		user_type.id = users.access_id
		LEFT JOIN (SELECT * FROM "student_mentor" WHERE "mentor_id" = $2) AS "requested" ON "requested"."student_id" = "users".id
		LEFT JOIN (SELECT job_id, student_id, project_title, position_title, username AS client_name, description, duration, budget, mentor_accepted, hired, job_status, mentor_id AS applicant_mentor
			FROM job_applicants
			JOIN jobs ON jobs.id = job_applicants.job_id
			JOIN users ON jobs.client_id = users.id
			JOIN job_status ON jobs.status_id = job_status.id
			WHERE job_applicants.student_id = $1
			AND job_applicants.mentor_id = $2
			AND jobs.status_id IN (1,2,3)
			) AS "job_applicants"
			ON job_applicants.student_id = users.id
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
		user_type.user_type,
		requested.accepted,
		job_applicants.student_id;`;
		} else if (req.user.user_type === 'Student') {
			return `SELECT
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
		user_type.user_type,
		requested.accepted
	FROM
		users
	LEFT JOIN
		user_type
			ON
		user_type.id = users.access_id
		LEFT JOIN (SELECT * FROM "student_mentor" WHERE "student_id" = $2) AS "requested" ON "requested"."mentor_id" = "users".id
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
		user_type.user_type,
		requested.accepted;`;
		} else {
			return `SELECT
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
		}
	};
	const values = [req.params.id];
	if (req.user.user_type === 'Student' || req.user.user_type === 'Mentor') {
		values.push(req.user.id);
	}
	pool.query(sqlText(), values)
		.then(result => {
			res.send(result.rows[0]);
		})
		.catch(error => {
			console.log('error on retrieving specific user details from database: ', error);
			res.sendStatus(500);
		});
});

module.exports = router;
