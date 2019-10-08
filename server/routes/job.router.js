const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "jobs";`;
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

router.get('/active', (req, res) => {
  const userId = req.user.id;
  const queryText = `SELECT * FROM "jobs" WHERE "status_id" = 3 AND "student_id" = $1;`;
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

router.get('/applied', (req, res) => {
  const userId = req.user.id;
  const queryText = `SELECT * FROM "jobs" WHERE "status_id" = 3 AND "student_id" = $1;`;
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

router.get('/completed', (req, res) => {
  const userId = req.user.id;
  const queryText = `SELECT * FROM "jobs" WHERE "status_id" = 4 AND "student_id" = $1;`;
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

module.exports = router;
