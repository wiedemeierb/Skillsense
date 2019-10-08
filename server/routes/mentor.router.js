const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET (ALL) ROUTE **/
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

/** GET (SEARCH) ROUTE **/
router.get('/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm + '%';
  const queryText = `SELECT * FROM "users" 
    WHERE "access_id" = 3 AND "username" LIKE $1;`;
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

module.exports = router;
