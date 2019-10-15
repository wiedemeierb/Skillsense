const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/list/:id', (req, res) => {
    let jobId = req.params.id;
    const queryText = `
        SELECT "job_applicants".id, "users".username, "users".focus_skill, 
        "jobs".project_title, "job_id", "student_id" FROM "job_applicants" 
        JOIN "users" ON "job_applicants".student_id = "users".id 
        JOIN "jobs" ON "jobs".id = "job_applicants".job_id WHERE "job_id" = $1;
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

router.get('/detail/:id', (req, res) => {
    let applicantId = req.params.id;
    const queryText = `
        SELECT "job_applicants".id, "users".username, "users".focus_skill, "users".location, 
        "users".github_url, "users".linkedin_url, "users".website_url, "users".email, 
        "jobs".project_title, "job_id", "student_id", "payment_terms", "cover_letter", 
        "attachment_url", "mentor_id", "mentor_accepted", "hired" FROM "job_applicants" 
        JOIN "users" ON "job_applicants".student_id = "users".id 
        JOIN "jobs" ON "jobs".id = "job_applicants".job_id WHERE "job_applicants".id = $1;
        `;

    pool.query(queryText, [applicantId])
        .then(result => {
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = router;
