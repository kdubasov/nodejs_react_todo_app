const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")

//app settings
const app = express();
app.use(cors());
app.use(bodyParser());

app.listen(8000, () => console.log('app started'));

//connect to mysql database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "kdubasov",
    password: ""
});

//queries
const getListTasksQuery = "SELECT * FROM todoapp";

//get data
let dbData;
connection.query(getListTasksQuery, (err,res,field) => {
    dbData = res;
})

//send data in client
app.get('/getAll',(req,res) => {
    res.send(dbData)
})

//add task in database
app.post('/add',(req,res) => {
    let data = [req.body.id, req.body.task, req.body.success];
    connection.query('INSERT INTO todoapp (`id`,`task`,`success`) VALUES (?,?,?)',data, (err,result) => {
        if (err) return false;
        res.json(result)
    })
})