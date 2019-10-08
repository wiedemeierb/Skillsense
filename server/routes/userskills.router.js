const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log('req.user:', req.user.id)
    // console.log('req.params', req.params)
    const queryText = `SELECT "user_tags".tag_id, "user_tags".user_id, "skill_tags".tag FROM "user_tags"
                        JOIN "skill_tags" on "user_tags".tag_id = "skill_tags".id
                        WHERE "user_tags".user_id = $1`
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

router.post('/', (req, res) => {
    console.log('in POST for userSkills', req.body.user, req.body.userSkills[0].id)
    const userSkillsId = req.body.userSkills[0].id;
    const user = req.body.user;
    const queryText = `INSERT INTO "user_tags" (tag_id, user_id) VALUES ($1, $2)`;
    pool.query(queryText, [userSkillsId, user])
    .then(() => res.sendStatus(201))
    .catch((error) => {
        console.log(error)
        res.sendStatus(500)
    })
})

// router.delete('/:id', rejectUnauthenticated, (req, res) => {
//     // console.log(req.body);

//     let id = req.params.id
//     // console.log(req.params.id)
//     let queryText = `DELETE FROM "items" WHERE "id" = $1`
//     pool.query(queryText, [id])
//         .then(results => res.sendStatus(201))
//         .catch(error => {
//             console.log('error in server side DELETE', error);
//             res.sendStatus(418)
//         })
// });

module.exports = router; 