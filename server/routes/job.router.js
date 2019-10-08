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

/**  POST NEW JOB ROUTE **/
router.post('/new', (req, res)=>{
  console.log(req.body)
  const job = req.body;
  const queryText = `INSERT INTO "jobs" ("project_title","position_title","description","duration","budget","mentor_required","status_id","client_id") VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`
  pool.query(queryText, [job.project_title, job.position_title, job.description, job.duration, job.budget, job.mentor_required, job.status_id, req.user.id])
  .then(result =>{
    res.sendStatus(200)
  })
  .catch(error =>{
    console.log(error)
    res.sendStatus(500)
  })
})

// router.post('/new', async (req, res) => {
//   const job = req.body;
//   const queryText = `INSERT INTO "jobs" ("project_title","position_title","description","duration","budget","mentor_required","status_id","client_id") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING "id";`
//   const connection = await pool.connect();
//   try{
//     await connection. query(`BEGIN;`)
//     let result = await connection.query(queryText, [job.project_title, job.position_title, job.description, job.duration, job.budget, job.mentor_required, job.status_id, req.user.id])
//     let jobId = result.rows[0].id;
//     for (let tag of job.tags){
//       await connection.query(`INSERT INTO "job_tags" ("job_id","tag_id") VALUES ($1, $2);`, [jobId, tag.id])
//     }
//     await connection.query(`COMMIT;`);
//     res.sendStatus(201)
//   }
//     catch(error) {
//       await connection.query(`ROLLBACK;`);
//       console.log(error)
//       res.sendStatus(500)
//     } finally {
//       connection.release();
//     }
// })

module.exports = router;
