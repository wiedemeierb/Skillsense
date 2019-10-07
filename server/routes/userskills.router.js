const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('req.user:', req.user.id)
    console.log('req.params', req.params)
    // const userId = req.params.id
    const queryText = `SELECT * FROM "user_tags" WHERE "user_id" = $1;`
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

module.exports = router; 