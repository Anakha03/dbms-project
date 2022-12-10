const express = require('express')
const mysql = require('mysql');
const router = express.Router()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anakha2003#',
    database: 'sms'
});

router.post('/attadd', (req, res) => {
    const studentid = req.body.studentid;
    const courseid = req.body.courseid;
    const attend = req.body.attend;

    connection.query("insert into `attendence` values (?, ?, ?)", [studentid, courseid, attend], (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.json(result)
        }
    })
})

router.get('/attview', (req, res) => {
    connection.query("select * from `attendence`", (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.json(result)
        }
    })
})

module.exports = router;