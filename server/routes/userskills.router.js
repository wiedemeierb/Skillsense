const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log('req.user:', req.user.id)
    // console.log('req.params', req.params)
    const queryText = `SELECT "skill_tags".id, "skill_tags".tag FROM "user_tags"
                        JOIN "skill_tags" on "user_tags".tag_id = "skill_tags".id
                        WHERE "user_tags".user_id = $1`;
    // console.log('in userskills router GET')
    // console.log(userId)
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.post('/', async (req, res) => {
    console.log('in POST for adding userSkills', req.user.id, req.body.id)
    const userId = req.user.id;
    const tagId = req.body.id;
    const sqlText = `INSERT
        INTO "user_tags"
            (tag_id, user_id)
        VALUES
            ($1, $2);`
    pool.query(sqlText, [tagId, userId])
        .then(result => {
            console.log('successful add of user skill into db')
            res.sendStatus(200)
        })
        .catch(error => {
            console.log('error on adding user skill into db: ', error);
            res.sendStatus(500)
        })
});

module.exports = router;
