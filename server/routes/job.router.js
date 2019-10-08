const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET ROUTE **/
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

/** GET (SEARCH) ROUTE **/
router.get('/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm + '%';
  const queryText = `SELECT * FROM "jobs" WHERE "project_title" LIKE $1;`;
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

/** GET (ACTIVE JOBS) ROUTE **/
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

/** GET (APPLIED JOBS) ROUTE **/
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

/** GET (COMPLETED JOBS) ROUTE **/
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
