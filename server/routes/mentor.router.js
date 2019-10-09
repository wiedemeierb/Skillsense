const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();

/** GET (ALL) ROUTE **/
router.get('/all', (req, res) => {
  const queryText = `
	SELECT * FROM "users" WHERE "access_id" = 2 
	AND "approved_mentor" = 3;
	`;

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

/** GET (STUDENT: ACTIVE MENTORS) ROUTE **/
router.get('/active', (req, res) => {
  const userId = req.user.id;
  const queryText = `
  	SELECT "username", "focus_skill" FROM "users" 
	JOIN "student_mentor" ON "users".id = "student_mentor".mentor_id
	WHERE "student_mentor".student_id = $1 AND "accepted" = true;
	`;
  pool
    .query(queryText, [userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

/** GET (STUDENT: INVITED MENTORS) ROUTE **/
router.get('/invited', (req, res) => {
  const userId = req.user.id;
  const queryText = `
  	SELECT "username", "focus_skill" FROM "users" 
	JOIN "student_mentor" ON "users".id = "student_mentor".mentor_id
	WHERE "student_mentor".student_id = $1 AND "accepted" = false;
	`;
  pool
    .query(queryText, [userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

/** GET (SEARCH) ROUTE **/
router.get('/search/', (req, res) => {
  const searchTerm = `%${req.query.searchTerm}%`;
  const searchSkill = req.query.searchSkill;

  const queryText = `
	SELECT "username", "location", "focus_skill", 
	array_agg("skill_tags".tag) AS "skill_names" FROM "users" 
	LEFT JOIN "user_tags" ON "users".id = "user_tags".user_id
	JOIN "skill_tags" ON "skill_tags".id = "user_tags".tag_id
	WHERE "access_id" = 2 AND "approved_mentor" = 3 
	AND "username" ILIKE $1 GROUP BY "users".id;
	`;

  pool
    .query(queryText, [searchTerm])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

/** GET (MENTORS PENDING ADMIN APPROVAL) ROUTE **/
router.get('/pending', (req, res) => {
  //query to get all mentors in system with pending status
  const queryText = `
	SELECT
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
		users.approved_mentor,
		user_type.user_type,
		mentor_status.mentor_status,
		array_agg(skill_tags.id) as skill_ids,
		array_agg(skill_tags.tag) as skill_names
	FROM
		users
	LEFT JOIN
		user_type
			ON
		user_type.id = users.access_id
	LEFT JOIN
		mentor_status
			ON
		users.approved_mentor = mentor_status.id
	LEFT JOIN
		user_tags
			ON
		user_tags.user_id = users.id
	LEFT JOIN
		skill_tags
			ON
		skill_tags.id = user_tags.tag_id
	WHERE
		user_type.user_type ILIKE 'Mentor' AND mentor_status.id = 2
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
		users.approved_mentor,
		user_type.user_type,
		mentor_status.mentor_status;`;

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

/** PATCH (ADMIN: UPDATE MENTOR APPROVAL STATUS) ROUTE **/
router.patch(`/admin/:id`, rejectUnauthenticated, (req, res) => {
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
