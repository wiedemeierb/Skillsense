const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated,
	rejectIfNotAdmin,
	rejectIfNotMentor,
} = require('../modules/authentication-middleware');
const router = express.Router();

/** GET (ALL) ROUTE FOR APPROVED MENTORS **/
router.get('/all', rejectUnauthenticated, (req, res) => {
	const queryText = `
SELECT
      "users".id,
      "username",
      "access_id",
      "focus_skill",
      array_agg("skill_tags".id) AS "skill_ids",
        array_agg("skill_tags".tag) AS "skill_names",
        requested.accepted
    FROM "users"
    LEFT JOIN "user_tags"
      ON "users".id = "user_tags".user_id
    LEFT JOIN "skill_tags"
      ON "skill_tags".id = "user_tags".tag_id
    LEFT JOIN "mentor_status"
      ON "mentor_status".id = "users".approved_mentor
    LEFT JOIN "user_type"
            ON "user_type".id = "users".access_id
        LEFT JOIN (SELECT * FROM student_mentor WHERE student_id = $1) AS "requested"
            ON requested.mentor_id = users.id
    WHERE
      "user_type".user_type ILIKE 'Mentor'
        AND
        "mentor_status".mentor_status ILIKE 'Approved'
    GROUP BY "users"."id", requested.accepted
    ORDER BY "id" DESC;`;
	pool.query(queryText, [req.user.id])
		.then(result => {
			result.rows.forEach(row => {
				row.skills = row.skill_ids.map((id, index) => {
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

/** GET (STUDENT: ACTIVE MENTORS) ROUTE BY STUDENT ID AND ACCEPTED STATUS**/
router.get('/active', rejectUnauthenticated, (req, res) => {
	const userId = req.user.id;
	const queryText = () => {
		if (req.user.user_type === 'Student') {
			return `
    SELECT
      "users".id,
      "username",
      "access_id",
      "focus_skill",
      array_agg("skill_tags".id) AS "skill_ids",
	  array_agg("skill_tags".tag) AS "skill_names",
	  accepted
    FROM "users"
    JOIN "student_mentor"
      ON "users".id = "student_mentor".mentor_id
    LEFT JOIN "user_tags"
      ON "users".id = "user_tags".user_id
    LEFT JOIN "skill_tags"
      ON "skill_tags".id = "user_tags".tag_id
    WHERE
      "student_mentor".student_id = $1
        AND
      "accepted" = true
    GROUP BY "users"."id", "student_mentor"."accepted";`;
		} else if (req.user.user_type === 'Mentor') {
			return `
    SELECT
      "users".id,
      "username",
      "access_id",
      "focus_skill",
      array_agg("skill_tags".id) AS "skill_ids",
	  array_agg("skill_tags".tag) AS "skill_names",
	  accepted
    FROM "users"
    LEFT JOIN "student_mentor"
      ON "users".id = "student_mentor".student_id
    LEFT JOIN "user_tags"
      ON "users".id = "user_tags".user_id
    LEFT JOIN "skill_tags"
      ON "skill_tags".id = "user_tags".tag_id
    WHERE
      "student_mentor".mentor_id = $1
        AND
      "accepted" = true
	GROUP BY "users"."id", "student_mentor"."accepted"
	ORDER BY "id" DESC;`;
		}
	};
	pool.query(queryText(), [userId])
		.then(result => {
			result.rows.forEach(row => {
				row.skills = row.skill_ids.map((id, index) => {
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

/** GET (STUDENT: INVITED MENTORS) ROUTE BY STUDENT ID WHERE ACCEPTED IS FALSE **/
router.get('/invited', rejectUnauthenticated, (req, res) => {
	const userId = req.user.id;
	const queryText = () => {
		if (req.user.user_type === 'Student') {
			return `
    SELECT
      "users".id,
      "username",
      "access_id",
      "focus_skill",
      array_agg("skill_tags".id) AS "skill_ids",
	  array_agg("skill_tags".tag) AS "skill_names",
	  accepted
    FROM "users"
    JOIN "student_mentor"
      ON "users".id = "student_mentor".mentor_id
    LEFT JOIN "user_tags"
      ON "users".id = "user_tags".user_id
    LEFT JOIN "skill_tags"
      ON "skill_tags".id = "user_tags".tag_id
    WHERE
      "student_mentor".student_id = $1
        AND
      "accepted" = false
	GROUP BY "users"."id", "student_mentor"."accepted"
	ORDER BY "users"."id" DESC;
    `;
		} else if (req.user.user_type === 'Mentor') {
			return `
    SELECT
      "users".id,
      "username",
      "access_id",
      "focus_skill",
      array_agg("skill_tags".id) AS "skill_ids",
	  array_agg("skill_tags".tag) AS "skill_names",
	  accepted
    FROM "users"
    JOIN "student_mentor"
      ON "users".id = "student_mentor".student_id
    LEFT JOIN "user_tags"
      ON "users".id = "user_tags".user_id
    LEFT JOIN "skill_tags"
      ON "skill_tags".id = "user_tags".tag_id
    WHERE
      "student_mentor".mentor_id = $1
        AND
      "accepted" = false
	GROUP BY "users"."id", "student_mentor"."accepted"
	ORDER BY "id" DESC;`;
		}
	};
	pool.query(queryText(), [userId])
		.then(result => {
			result.rows.forEach(row => {
				row.skills = row.skill_ids.map((id, index) => {
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

/** GET (SEARCH) ROUTE BY MENTOR NAME AND/OR SKILL TAG **/
router.get('/search/', rejectUnauthenticated, (req, res) => {
	const searchTerm =
		req.query.searchTerm !== '' ? `%${req.query.searchTerm}%` : `%%`;
	const searchSkill = req.query.skill != 0 ? Number(req.query.skill) : 0;
	const queryStart = `
SELECT
      "users".id,
      "username",
      "access_id",
      "focus_skill",
      array_agg("skill_tags".id) AS "skill_ids",
        array_agg("skill_tags".tag) AS "skill_names",
        requested.accepted
    FROM "users"
    LEFT JOIN "user_tags"
      ON "users".id = "user_tags".user_id
    LEFT JOIN "skill_tags"
      ON "skill_tags".id = "user_tags".tag_id
    LEFT JOIN "mentor_status"
      ON "mentor_status".id = "users".approved_mentor
    LEFT JOIN "user_type"
            ON "user_type".id = "users".access_id
        LEFT JOIN (SELECT * FROM student_mentor WHERE student_id = $1) AS "requested"
            ON requested.mentor_id = users.id
    WHERE
      "user_type".user_type ILIKE 'Mentor'
        AND
        "mentor_status".mentor_status ILIKE 'Approved'`;

	const queryInput = ` AND "username" ILIKE $2`;
	const querySkill = ` AND "tag_id" = $3`;
	const queryEnd = ` GROUP BY "users"."id", requested.accepted
    ORDER BY "id" DESC;`;

	const queryText = () => {
		if (searchSkill !== 0) {
			return queryStart + queryInput + querySkill + queryEnd;
		} else {
			return queryStart + queryInput + queryEnd;
		}
	};

	const queryParams = () => {
		if (searchSkill) {
			return [req.user.id, searchTerm, searchSkill];
		} else {
			return [req.user.id, searchTerm];
		}
	};

	pool.query(queryText(), queryParams())
		.then(result => {
			result.rows.forEach(row => {
				row.skills =
					row.skill_ids &&
					row.skill_ids.map((id, index) => {
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

/** GET (MENTORS PENDING ADMIN APPROVAL) ROUTE **/
router.get('/pending', rejectIfNotAdmin, (req, res) => {
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
		(user_type.user_type ILIKE 'Mentor') AND ("mentor_status".mentor_status ILIKE 'Pending Approval')
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
		mentor_status.mentor_status
		ORDER BY "id" DESC;`;

	pool
		.query(queryText)
		.then(result => {
			//creates an array in each row that consists of skill objects {id: name}
			result.rows.forEach(row => {
				row.skills = row.skill_ids.map((id, index) => {
					return { id: id, tag: row.skill_names[index] };
				});
			});
			res.send(result.rows);
		})
		.catch(error => {
			console.log('error on GET of mentors pending approval: ', error);
			res.sendStatus(500);
		});
});

/** PUT ROUTE FOR MENTOR TO ACCEPT STUDENT CONNECTION **/
router.put('/accept/:id', rejectUnauthenticated, (req, res) => {
	const queryText = `UPDATE "student_mentor" SET "accepted" = true WHERE "mentor_id" = $1 AND "student_id" = $2;`
	pool.query(queryText, [req.user.id, req.params.id])
	.then(result => {
		res.sendStatus(200)
	}).catch(error => {
		res.sendStatus(500)
	})
})

/** DELETE ROUTE FOR MENTOR TO DECLINE STUDENT CONNECTION **/
router.delete('/decline/:id', rejectUnauthenticated, (req, res) => {
	const queryText = `DELETE FROM "student_mentor" WHERE "mentor_id" = $1 AND "student_id" = $2;`
	pool.query(queryText, [req.user.id, req.params.id])
	.then(result => {
		res.sendStatus(200)
	}).catch(error => {
		res.sendStatus(500)
	})
})

/** POST (STUDENT: SEND MENTOR REQUEST) ROUTE **/
router.post('/request', rejectUnauthenticated, async (req, res) => {
	const userId = req.user.id;
	const mentorId = req.body.mentor;
	const message = req.body.message;

	const queryText = `
    INSERT INTO "messages" ("sender_id", "recipient_id", "message", "date_time")
    VALUES ($1, $2, $3, NOW()) returning "id";`;

	const connection = await pool.connect();
	try {
		await connection.query(`BEGIN;`);
		let result = await connection.query(queryText, [userId, mentorId, message]);
		let messageId = result.rows[0].id;
		await connection.query(
			`INSERT INTO "student_mentor" ("student_id", "mentor_id", "message_id")
        VALUES ($1, $2, $3);`,
			[userId, mentorId, messageId]
		);
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

/** PATCH (ADMIN: UPDATE MENTOR APPROVAL STATUS) ROUTE **/
router.patch(`/admin/:id`, rejectIfNotAdmin, (req, res) => {
	//expects a req.body with {newStatus: #}
	const queryText = `UPDATE users SET approved_mentor = $1  WHERE users.id = $2`;
	const values = [req.body.newStatus, req.params.id];

	pool
		.query(queryText, values)
		.then(result => {
			res.sendStatus(200);
		})
		.catch(error => {
			console.log('error updating mentor status: ', error);
			res.sendStatus(500);
		});
});

//PATCH route for mentor to request admin approval
router.patch(`/request`, rejectIfNotMentor, (req, res) => {
	const queryText = `UPDATE users SET approved_mentor = 2 WHERE users.id = $1`;
	const values = [req.user.id];

	pool
		.query(queryText, values)
		.then(result => {
			res.sendStatus(200);
		})
		.catch(error => {
			console.log('error on update to requesting admin approval: ', error);
		});
});

module.exports = router;
