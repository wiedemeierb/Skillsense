const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET ROUTE FOR LIST OF ALL SKILLS
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "skill_tags";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;