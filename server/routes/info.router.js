const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get account types available
router.get('/types/user', (req, res) => {
  const sqlText = `SELECT * FROM user_type`
  pool.query(sqlText)
    .then(result => res.send(result.rows))
    .catch(error => {
      console.log('error on getting user types: ', error)
      res.sendStatus(500)
    })
});

router.get('/types/skills', (req, res) => {
	const queryText = `SELECT * FROM "skill_tags";`;
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

module.exports = router;
