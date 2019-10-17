const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET LIST OF ALL APPLICANTS FOR A SELECTED JOB **/
router.get('/list/:id', (req, res) => {
    const jobId = req.params.id;
    const queryText = `
        SELECT "job_applicants".id, "job_applicants".hired, "users".username, "users".focus_skill,
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

/** GET APPLICANT DETAILS **/
router.get('/detail/:id', (req, res) => {
    const applicantId = req.params.id;
    const queryText = `
        SELECT "job_applicants".id, "users".username, "users".focus_skill, "users".location, "users".bio,
        "users".github_url, "users".linkedin_url, "users".website_url, "users".email,
        "jobs".project_title, "job_id", "student_id", "payment_terms", "cover_letter",
        "attachment_url", "mentor_id", "mentor_accepted", "hired", "status_id" FROM "job_applicants"
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

/** UPDATE APPLICATION + JOB UPON HIRING **/
router.patch('/hire', async (req, res) => {
    const applicantId = req.body.applicantId;
    const jobId = req.body.jobId;
    const queryText = `
        UPDATE "job_applicants" SET "hired" = true WHERE "id" = $1;
        `;
    const connection = await pool.connect();
    try {
        await connection.query(`BEGIN;`);
        await connection.query(queryText, [applicantId]);
        await connection.query(`UPDATE "jobs" SET "status_id" = 3 WHERE "id" = $1`, [jobId]);
        await connection.query(`COMMIT;`);
        res.sendStatus(201);
    } catch (error) {
        await connection.query(`ROLLBACK;`);
        console.log(error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

module.exports = router;
