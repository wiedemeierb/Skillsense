const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//GET ROUTE FOR ALL MESSAGES
//NEEDS DEVELOPMENT: SHOULD PULL WHERE SENDER OR RECEIVER ID IS THE CURRENT USER, GROUP BY OTHER USER
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "messages" ORDER BY "id" ASC;`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;
