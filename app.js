//https://www.youtube.com/watch?v=4fWWn2Pe2Mk
//https://aurora.edu/about/maps-directions/

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = 5000
const mysql = require('mysql')
const { json } = require('body-parser')


//this will be lashes db soon
//also put the info in a .env file for security reasons
require('dotenv/config')
let mysqlConnection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})

mysqlConnection.connect((err)=>{
  if(!err)
  console.log('Db Connected')
  else
  console.log('Not connected')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})






app.get('/location', (req, res) => {
  mysqlConnection.query('Select * from buildings',(err,rows,fields)=>{

    if(!err)
    res.send(rows)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })

})

app.get('/location/:name', (req, res) => {
  mysqlConnection.query('Select * from buildings where name = ?',[req.params.name],(err,row,fields)=>{

    if(!err)
    res.send(row)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })
})