const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")

//app settings
const app = express();
app.use(cors());
app.use(bodyParser());

app.listen(8000, () => console.log('app started'));

//connect to mysql database (ENTER YOUR DATA)
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "kdubasov",//YOUR DATABASE
    password: ""
});

//queries
const getListTasksQuery = "SELECT * FROM todoapp";

//get data
let dbData;
connection.query(getListTasksQuery, (err,res) => {
    dbData = res;
})

//send data in client
app.get('/getAll',(req,res) => {
    res.send(dbData)
});

//add task in database
app.post('/add',(req,res) => {
    let data = [req.body.id, req.body.task, req.body.success];
    connection.query('INSERT INTO todoapp (`id`,`task`,`success`) VALUES (?,?,?)',data, (err,result) => {
        if (err) return false;
        //для добавления в базу результата
        res.json(result)
    });
});

//add task in database
app.post('/delete',(req,res) => {
    let data = req.body.id;
    connection.query(`DELETE FROM todoapp WHERE id=${data}`,data, (err,result) => {
        if (err) return false;
        //для добавления в базу результата
        res.json(result);
    });
});

//update task status in database
app.post('/update',(req,res) => {
    let data = [req.body.id, req.body.success];
    connection.query(`UPDATE todoapp SET success = ${req.body.success?0:1} WHERE id = ${req.body.id}`,data, (err,result) => {
        if (err) return false;
        //для добавления в базу результата
        res.json(result);
    });
});