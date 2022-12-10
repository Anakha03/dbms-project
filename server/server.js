const mysql = require('mysql');
const express = require('express');
const cors=require('cors');

const app = express();
app.use(express.json())
app.use(cors())


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anakha2003#',
    database: 'sms'
});

connection.connect((err) => {
    if (err) console.log(err)
    else
        console.log('Connected')
})

const login = require('./routes/login')

app.use('/', login)

app.get('/list', (req, res) => {
    connection.query("select * from `student`", (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.json(result)
        }
    })
})
app.delete("/delete/:rollno", (req, res) => {
    const rollno = req.params.rollno;
    var deletedstudent;
    connection.query("select * from `student` where rollno=?", rollno, (error, result) => {
       deletedstudent=result;
    })
    connection.query("delete from `student` where rollno=?", rollno, (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.json(deletedstudent)
        }
    })

})
app.post('/add', (req, res) => {
    console.log(req.body)
    const rollno = req.body.rollno;
    const sname = req.body.sname;
    const dob = req.body.dob;
    const email = req.body.email;
    const cid = req.body.cid;
    const pno = req.body.pno;
    
    connection.query("insert into `student` values (?, ?, ?, ?, ?, ?)", [rollno, sname, dob, email, cid, pno], (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.json(result)
        }
    })
})

app.post('/edit/:rollno', (req, res) => {
    const rollno = req.params.rollno;
    const rno = req.body.rollno;
    const sname = req.body.sname;
    const email = req.body.email;
    const dob = req.body.dob;
    const pno = req.body.pno;
    const cid = req.body.cid;
    connection.query("update `student` set rollno=?, sname=?, dob=?, email=?, cid=?, pno=?  where rollno=?", [rno, sname, dob, email, cid, pno, rollno], (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.send('Table updated!')
        }
    })
})

const attend = require('./routes/attendance')

app.use('/', attend)

app.listen(8000,()=>{
    console.log("Server running in port 8000")
});