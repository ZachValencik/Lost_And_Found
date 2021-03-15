//https://www.youtube.com/watch?v=4fWWn2Pe2Mk
//https://aurora.edu/about/maps-directions/

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
const mysql = require('mysql')
const { json } = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//this will be lashes db soon
//also put the info in a .env file for security reasons
require('dotenv/config')
let mysqlConnection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  multipleStatements: true
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





//GET A LOCATION
app.get('/location', (req, res) => {
  mysqlConnection.query('Select * from buildings',(err,rows,fields)=>{

    if(!err)
    res.send(rows)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })

})

app.get('/location/:location_name', (req, res) => {
  mysqlConnection.query('Select * from buildings where location_name = ?',[req.params.location_name],(err,row,fields)=>{

    if(!err)
    res.send(row)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })
})


//POST AN LOCATION
app.post('/location', (req, res) => {
  let emp = req.body;
  var sql = "SET @location_name = ?;SET @floor_num = ?;SET @room_num = ?; SET @hasBasement = ?; \
  CALL LocationAdd(@location_name,@floor_num,@room_num,@hasBasement);";
  mysqlConnection.query(sql, [emp.location_name, emp.floor_num, emp.room_num, emp.hasBasement], (err, rows, fields) => {
      if (!err)
          rows.forEach(element => {
              if(element.constructor == Array)
              res.send('Inserted location: '+element[0].location_name);
          });
      else
          console.log(err);
  })

})

//Put Location
app.put('/location', (req, res) => {
  let emp = req.body;
  var sql = "SET @location_name = ?;SET @floor_num = ?;SET @room_num = ?; SET @hasBasement = ?; \
  CALL LocationEdit(@location_name,@floor_num,@room_num,@hasBasement);";
  mysqlConnection.query(sql, [emp.location_name, emp.floor_num, emp.room_num, emp.hasBasement], (err, rows, fields) => {
      if (!err)
          res.send('Updated Success');
        
      else
          console.log(err);
  })

})



//DELETE LOCATION
app.delete('/location/:location_name', (req, res) => {
  mysqlConnection.query(' Delete from buildings where location_name = ?',[req.params.location_name],(err,row,fields)=>{

    if(!err)
    res.send('Deleted location')
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })
})