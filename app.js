//https://www.youtube.com/watch?v=4fWWn2Pe2Mk
//https://aurora.edu/about/maps-directions/
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const { json } = require('body-parser')
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use('/img',express.static(__dirname+'public/img'))



//set views
app.set('views','./views')
app.set('view engine','hbs')
//this will be lashes db soon
//also put the info in a .env file for security reasons

const mysql = require('mysql')
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



const port = 5000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



app.get('/', (req, res) => {

    res.render(__dirname+'/views/index.hbs')

})

app.get('/login', (req, res) => {

  res.render(__dirname+'/views/login.hbs')
 

})


app.post('/login', (req, res) => { 
  let email = req.body.email;
  let password = req.body.password;
  mysqlConnection.query('Select password from user where email =? ',email,(err,rows,fields)=>{

  console.log(`Trying to Log In as ${email}`);
  
  if(password==rows[0].password){
  console.log("Logged IN!")
  res.render(__dirname+'/views/index.hbs')
  }else{
    console.log("Wrong Password")
    res.render(__dirname+'/views/login.hbs')
  }

  });
  
})



app.get('/reportItem', (req, res) => {

  res.render(__dirname+'/views/reportItem.hbs')
 

})


//USERS
app.get('/users', (req, res) => {
  mysqlConnection.query('Select * from user',(err,rows,fields)=>{

    if(!err){
    const limit = req.query.limit
    if(limit!=null){
    const resultUsers = rows.slice(0,limit)
    res.send(resultUsers)
    }else
        res.send(rows)
    }
    else
    console.log(err);
    
  })


})


app.get('/users/:id_user', (req, res) => {
  mysqlConnection.query('Select * from user where id_user = ?',[req.params.id_user],(err,row,fields)=>{

    if(!err)
    res.send(row)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })
})

app.post('/users', (req, res) => {
  let emp = req.body;
  var sql = "SET @id_user = ?;SET @user_name = ?;SET @password = ?; \
  CALL UserAdd(@id_user,@user_name,@password);";
  mysqlConnection.query(sql, [emp.id_user, emp.user_name, emp.password], (err, rows, fields) => {
      if (!err)
          rows.forEach(element => {
              if(element.constructor == Array)
              res.send('User created and given id of: '+element[0].id_user);
          });
      else
          console.log(err);
  })

})

//END USERS


//START OF LOCATION
//GET A LOCATION
app.get('/locations', (req, res) => {
  const location = req.query.location_name

  if(location!=null){
    mysqlConnection.query('Select * from location where location_name = ?',location,(err,rows,fields)=>{

      if(!err)
      res.send(rows)
     // console.log(rows[0].floors)
      else
      console.log(err);
      
    })

  }else{

  mysqlConnection.query('Select * from location',(err,rows,fields)=>{

    if(!err)
    res.send(rows)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })
}
})

app.get('/locations/:location_name', (req, res) => {
  mysqlConnection.query('Select * from location where location_name = ?',[req.params.location_name],(err,row,fields)=>{

    if(!err)
    res.send(row)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })
})


//POST AN LOCATION
app.post('/locations', (req, res) => {
  /*let emp = req.body;
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
  })*/
  let emp = req.body;

  mysqlConnection.query('insert into location (location_name,floor_num,room_num,hasBasement) Values (?,?,?,?)',[emp.location_name,emp.floor_num,emp.room_num,emp.hasBasement],(err,row,fields)=>{

    if(!err)
    res.send(row)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })

})

//Put Location
app.put('/locations', (req, res) => {
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
app.delete('/locations/:location_name', (req, res) => {
  mysqlConnection.query(' Delete from location where location_name = ?',[req.params.location_name],(err,row,fields)=>{
    
    if(row.affectedRows!=0){
      res.send(`Deleted ${req.params.location_name}`)
      
    }
    else{
      let errorMessage = {
        status:400,
        message: `Cannot delete ${req.params.location_name} since it doesnt exist in database` 
      }
      res.status(400)
      res.send(errorMessage)
      

    }
    
    
  })
})

//END LOCATION


//start of ITEMS.

app.get('/items', (req, res) => {
  const item = req.query.item
  if(item!=null){
    mysqlConnection.query('Select * from item where item = ?',item,(err,rows,fields)=>{

      if(!err){
        const limit = req.query.limit
        if(limit!=null){
        const resultUsers = rows.slice(0,limit)
        res.send(resultUsers)
        }else
            res.send(rows)
        }
        else
        console.log(err);
      
    })
    

  }else{
  mysqlConnection.query('Select * from item',(err,rows,fields)=>{

    if(!err){
      const limit = req.query.limit
      if(limit!=null){
      const resultUsers = rows.slice(0,limit)
      res.send(resultUsers)
      }else
          res.send(rows)
      }
      else
      console.log(err);
    
  })
}
})

app.get('/items/:category', (req, res) => {
  mysqlConnection.query('Select * from item where category = ? ',[req.params.category],(err,rows,fields)=>{

    if(!err)
    res.send(rows)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })

})

app.post('/items', (req, res) => {
 
  let emp = req.body;

  mysqlConnection.query('insert into items (location_name,floor_num,room_num,hasBasement) Values (?,?,?,?)',[emp.location_name,emp.floor_num,emp.room_num,emp.hasBasement],(err,row,fields)=>{

    if(!err)
    res.send(row)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })

})