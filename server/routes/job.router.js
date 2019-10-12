const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
	rejectUnauthenticated,
	rejectIfNotClient
} = require('../modules/authentication-middleware');

/** GET ROUTE FOR ALL JOBS WITH SKILL TAGS **/
router.get('/', (req, res) => {
	const queryText = `
  SELECT
    "jobs"."id",
    "project_title",
    "position_title",
    "description",
    "duration",
    "budget",
    "mentor_required",
    "status_id",
    "username" AS "client",
    "location",
    "client_id",
    array_agg("job_tags"."tag_id") AS "tag_ids",
    array_agg("skill_tags"."tag") AS "skill_names"
  FROM "jobs"
  LEFT JOIN "job_tags"
    ON "jobs"."id" = "job_tags"."job_id"
  LEFT JOIN "skill_tags"
    ON "job_tags".tag_id = "skill_tags"."id"
  LEFT JOIN "users"
    ON "jobs"."client_id" = "users"."id"
	GROUP BY "jobs"."id","users"."id";
	`;

	pool
		.query(queryText)
		.then(result => {
			//attach a "skills" property that is combined id and name
			result.rows.forEach(row => {
				row.skills = row.tag_ids.map((id, index) => {
					return { id: id, tag: row.skill_names[index] };
				});
			});
			res.send(result.rows);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
});

/** GET ROUTE FOR JOBS BY STATUS AND CLIENT ID **/
router.get('/client/:jobType', rejectIfNotClient, (req, res) => {
	const jobType = req.params.jobType;
	const userId = req.user.id;
	//route currently does not yet accommodate for offer extended job_status

	const queryText = `
  SELECT
    "jobs"."id",
    "project_title",
    "position_title",
    "description",
    "duration",
    "budget",
    "mentor_required",
    "status_id",
    "username" AS "client",
    "location",
    "client_id",
    array_agg("job_tags"."tag_id") AS "tag_ids",
    array_agg("skill_tags"."tag") AS
    "skill_names"
  FROM "jobs"
  LEFT JOIN "job_tags"
    ON "jobs"."id" = "job_tags"."job_id"
  LEFT JOIN "skill_tags"
    ON "job_tags".tag_id = "skill_tags"."id"
  LEFT JOIN "users"
    ON "jobs"."client_id" = "users"."id"
  WHERE
    "status_id" = $1
      AND
    "jobs".client_id = $2
	GROUP BY "jobs"."id","users"."id";
	`;

	pool
		.query(queryText, [jobType, userId])
		.then(result => {
			//attach a "skills" property that is combined id and name
			result.rows.forEach(row => {
				row.skills = row.tag_ids.map((id, index) => {
					return { id: id, tag: row.skill_names[index] };
				});
			});
			res.send(result.rows);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
});

/** GET (SEARCH) ROUTE BY JOB TITLE AND/OR SKILL TAG **/
router.get('/search', (req, res) => {
	const searchTerm =
		req.query.searchTerm !== '' ? `%${req.query.searchTerm}%` : `%%`;
	const searchSkill = req.query.skill != 0 ? Number(req.query.skill) : 0;
	const queryStart = `
  SELECT
    "jobs"."id",
    "project_title",
    "position_title",
    "description",
    "duration",
    "budget",
    "mentor_required",
    "status_id",
    "username" AS "client",
    "location",
    "client_id",
    array_agg("job_tags"."tag_id") AS "tag_ids",
    array_agg("skill_tags"."tag") AS "skill_names"
  FROM "jobs"
  LEFT JOIN "job_tags"
    ON "jobs"."id" = "job_tags"."job_id"
  LEFT JOIN "skill_tags"
    ON "job_tags".tag_id = "skill_tags"."id"
  LEFT JOIN "users"
    ON "jobs"."client_id" = "users"."id"`;

	//additional sql Query text to use based on search input and skills sent on request
	const queryInput = ` WHERE "project_title" ILIKE $1`;
	const querySkill = ` AND "tag_id" = $2`;
	const queryEnd = ` GROUP BY "jobs"."id","users"."id";`;

	//function to add search query text to sql query text
	const queryText = () => {
		if (searchSkill !== 0) {
			return queryStart + queryInput + querySkill + queryEnd;
		} else {
			return queryStart + queryInput + queryEnd;
		}
	};

	//function to add skill filters to sql query text
	const queryParams = () => {
		if (searchSkill) {
			return [searchTerm, searchSkill];
		} else {
			return [searchTerm];
		}
	};

	pool
		.query(queryText(), queryParams())
		.then(result => {
			//attach a "skills" property that is combined id and name
			result.rows.forEach(row => {
				row.skills = row.tag_ids.map((id, index) => {
					return { id: id, tag: row.skill_names[index] };
				});
			});
			res.send(result.rows);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
});

/** GET (ACTIVE JOBS) ROUTE BY STATUS AND STUDENT ID **/
router.get('/active', rejectUnauthenticated, (req, res) => {
	const userId = req.user.id;
	const queryText = `
    SELECT
      "jobs"."id",
      "project_title",
      "position_title",
      "description",
      "duration",
      "budget",
      "mentor_required",
      "status_id",
      "users"."username" AS "client",
      "location",
      "client_id",
      array_agg("job_tags"."tag_id") AS "tag_ids",
      array_agg("skill_tags"."tag") AS "skill_names"
    FROM "jobs"
    LEFT JOIN "job_tags"
      ON "jobs"."id" = "job_tags"."job_id"
    JOIN "job_applicants"
      ON "job_applicants".job_id = "jobs".id
    LEFT JOIN "skill_tags"
      ON "job_tags".tag_id = "skill_tags"."id"
    LEFT JOIN "users"
      ON "jobs"."client_id" = "users"."id"
    LEFT JOIN "job_status"
      ON "job_status".id = jobs.status_id
    WHERE
      "job_status".job_status ILIKE 'In Progress'
    AND
      "job_applicants".student_id = $1
    GROUP BY "jobs"."id","users"."id";
    `;

	pool
		.query(queryText, [userId])
		.then(result => {
			//attach a "skills" property that is combined id and name
			result.rows.forEach(row => {
				row.skills = row.tag_ids.map((id, index) => {
					return { id: id, tag: row.skill_names[index] };
				});
			});
			res.send(result.rows);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
});

/** GET (APPLIED JOBS) ROUTE BY STATUS AND STUDENT ID **/
router.get('/applied', (req, res) => {
	const userId = req.user.id;
	const queryText = `
    SELECT
      "jobs"."id",
      "project_title",
      "position_title",
      "description",
      "duration",
      "budget",
      "mentor_required",
      "status_id",
      "users"."username" AS "client",
      "location", "client_id",
      array_agg("job_tags"."tag_id") AS "tag_ids",
      array_agg("skill_tags"."tag") AS "skill_names"
    FROM "jobs"
    LEFT JOIN "job_tags"
      ON "jobs"."id" = "job_tags"."job_id"
    JOIN "job_applicants"
      ON "job_applicants".job_id = "jobs".id
    LEFT JOIN "skill_tags"
      ON "job_tags".tag_id = "skill_tags"."id"
    LEFT JOIN "users"
      ON "jobs"."client_id" = "users"."id"
    LEFT JOIN "job_status"
      ON "job_status".id = jobs.status_id
    WHERE
      "job_status".job_status ILIKE 'Open'
    AND
      "job_applicants".student_id = $1
    GROUP BY "jobs"."id","users"."id";
    `;

	pool
		.query(queryText, [userId])
		.then(result => {
			//attach a "skills" property that is combined id and name
			result.rows.forEach(row => {
				row.skills = row.tag_ids.map((id, index) => {
					return { id: id, tag: row.skill_names[index] };
				});
			});
			res.send(result.rows);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
});

/** GET (COMPLETED JOBS) ROUTE BY STATUS AND STUDENT ID **/
router.get('/completed', (req, res) => {
	const userId = req.user.id;
	const queryText = `
    SELECT
      "jobs"."id",
      "project_title",
      "position_title",
      "description",
      "duration",
      "budget",
      "mentor_required",
      "status_id",
      "users"."username" AS "client",
      "location",
      "client_id",
      array_agg("job_tags"."tag_id") AS "tag_ids",
      array_agg("skill_tags"."tag") AS "skill_names"
    FROM "jobs"
    LEFT JOIN "job_tags"
      ON "jobs"."id" = "job_tags"."job_id"
    JOIN "job_applicants"
      ON "job_applicants".job_id = "jobs".id
    LEFT JOIN "skill_tags"
      ON "job_tags".tag_id = "skill_tags"."id"
    LEFT JOIN "users"
      ON "jobs"."client_id" = "users"."id"
    LEFT JOIN "job_status"
      ON "job_status".id = jobs.status_id
    WHERE
      "job_status".job_status ILIKE 'Completed'
        AND
      "job_applicants".student_id = $1
    GROUP BY "jobs"."id","users"."id";
    `;

	pool
		.query(queryText, [userId])
		.then(result => {
			//attach a "skills" property that is combined id and name
			result.rows.forEach(row => {
				row.skills = row.tag_ids.map((id, index) => {
					return { id: id, tag: row.skill_names[index] };
				});
			});
			res.send(result.rows);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
});

/** POST ROUTE FOR NEW JOB AND ASSOCIATED SKILL TAGS **/
router.post('/new', rejectUnauthenticated, async (req, res) => {
	const job = req.body;
	const queryText = `
  INSERT
   INTO "jobs"
      ("project_title","position_title","description","duration","budget",
  "mentor_required","status_id","client_id")
    VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING "id";
	`;

	const connection = await pool.connect();
	try {
		await connection.query(`BEGIN;`);
		let result = await connection.query(queryText, [
			job.project_title,
			job.position_title,
			job.description,
			job.duration,
			job.budget,
			job.mentor_required,
			job.status_id,
			req.user.id
		]);
		let jobId = result.rows[0].id;
		for (let tag of job.selected) {
			await connection.query(
				`INSERT INTO "job_tags" ("job_id","tag_id") VALUES ($1, $2);`,
				[jobId, tag.id]
			);
		}
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

/** POST ROUTE FOR JOB APPLICATION **/
router.post('/apply', rejectUnauthenticated, (req, res) => {
	let queryText = `
  INSERT
    INTO "job_applicants"
      ("job_id", "student_id","payment_terms","cover_letter","attachment_url","mentor_id")
    VALUES
      ($1,$2,$3,$4,$5,$6);`;

	pool
		.query(queryText, [
			req.body.job_id,
			req.user.id,
			req.body.payment_terms,
			req.body.cover_letter,
			req.body.attachment_url,
			req.body.mentor_id
		])
		.then(response => {
			res.sendStatus(201);
		})
		.catch(error => {
			console.log('error on posting new job application: ', error);
			res.sendStatus(500);
		});
});

/** GET ROUTE FOR SELECTED JOB DETAILS **/
router.get('/detail/:id', rejectUnauthenticated, (req, res) => {
	const queryText = `
  SELECT
    "jobs"."id",
    "project_title",
    "position_title",
    "description",
    "duration",
    "budget",
    "mentor_required",
    "status_id",
    "username","location",
    "users".username,
    "client_id",
    array_agg("job_tags"."tag_id") AS "tag_ids",
    array_agg("skill_tags"."tag") AS "skill_names"
  FROM "jobs"
  LEFT JOIN "job_tags"
    ON "jobs"."id" = "job_tags"."job_id"
  LEFT JOIN "skill_tags"
    ON "job_tags".tag_id = "skill_tags"."id"
  LEFT JOIN "users"
    ON "jobs"."client_id" = "users"."id"
  WHERE "jobs".id = $1
  GROUP BY "jobs"."id","users"."id";`;

	pool
		.query(queryText, [req.params.id])
		.then(result => {
			//attach a "skills" property that is combined id and name
			result.rows.forEach(row => {
				row.skills = row.tag_ids.map((id, index) => {
					return { id: id, tag: row.skill_names[index] };
				});
			});
			res.send(result.rows[0]);
		})
		.catch(error => {
			console.log('error in getting job details', error);
			res.sendStatus(500);
		});
});

module.exports = router;
