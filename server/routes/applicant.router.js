const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    let jobId = req.params.id;
    const queryText = `
    SELECT "users".username, "users".focus_skill, "job_applicants".id, "job_id", "student_id", "payment_terms", 
    "cover_letter", "attachment_url", "mentor_id", "mentor_accepted", "hired" FROM "job_applicants" 
    JOIN "users" on "job_applicants".student_id = "users".id WHERE "job_id" = $1;
    `;

    pool.query(queryText, [jobId])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = router;
