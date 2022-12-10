const express = require('express')
const mysql = require('mysql');
const router = express.Router()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anakha2003#',
    database: 'sms'
});

router.post('/auth', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM userlogin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results) {
                response.json({
                    status: true
                });
            } else {
                response.json({
                    status: false
                });
            }
        });
    } else{
        response.send('Please enter Username and Password!');
    }
});

module.exports = router;