const express = require('express')
const router = express.Router();
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

router.get('/',(req,res)=>{
    if(req.session.email==null)
      res.render('index');
    else{
      return res.render('index',{
        logedIn:`Logged in as ${req.session.email}`
    })

    }
})


router.get('/login', (req, res) => {
  if(!req.session.email)
    res.render('login')
  else{
    res.redirect('/')
  }
})

//This logs the user in
router.post('/login', async (req, res) => { 
  let email = req.body.email;
  let password = req.body.password;
  mysqlConnection.query('Select password from user where email =? ',email, async (err,rows,fields)=>{

  console.log(`Trying to Log In as ${email}`);
  if(err){
    //console.log("Wrong Email or Password")
    return res.render('login',{

        message:'Wrong Email or Password!'
    })
  }
  else if(rows.length==0) {
    console.log("Wrong Email or Password")
    return res.render('login',{
        message:'Wrong Email or Password!'
    })
  }
  
  else if(password== await rows[0].password){//THIS LOGS YOU IN
  console.log("Logged IN!")
  req.session.email = email;
  res.redirect('/')
  }else{
    return res.render('login',{
        message:`Wrong Email or Password!`
    })
  }

});
  
})


router.get('/logout', (req, res) => {

      if(req.session.email)
        req.session.destroy()
        
    res.redirect('/')
})

router.get('/lostItems', (req, res) => {
  if(req.session.email){
    return res.render('lostItems',{
      logedIn:true
  })
  }
    
  else
    res.redirect('/login')
})



router.get('/admin', (req, res) => {
  //TODO: make sure only admins can access it.
  //Should make the session know its an admin so we can display admin only links
  res.render('admin');
})


//USERS
router.get('/users', (req, res) => {
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


router.get('/users/:id_user', (req, res) => {
  mysqlConnection.query('Select * from user where id_user = ?',[req.params.id_user],(err,row,fields)=>{

    if(!err)
    res.send(row)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })
})

/*
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
*/
//END USERS


//START OF LOCATION
//GET A LOCATION
router.get('/locations', (req, res) => {
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

router.get('/locations/:location_name', (req, res) => {
  mysqlConnection.query('Select * from location where location_name = ?',[req.params.location_name],(err,row,fields)=>{

    if(!err)
    res.send(row)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })
})


//POST AN LOCATION
router.post('/locations', (req, res) => {
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
router.put('/locations', (req, res) => {
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
router.delete('/locations/:location_name', (req, res) => {
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

router.get('/items', (req, res) => {
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

router.get('/items/:category', (req, res) => {
  mysqlConnection.query('Select * from item where category = ? ',[req.params.category],(err,rows,fields)=>{

    if(!err)
    res.send(rows)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })

})




router.post('/items', (req, res) => {

  let emp = req.body;

  mysqlConnection.query('insert into item (item_name,item_category,item_desc,item_location,item_room,found_by,date_found) Values (?,?,?,?,?,?,?)',[emp.item_name,emp.item_category,emp.item_desc,emp.item_location,emp.item_room,emp.found_by,emp.date_found],(err,row,fields)=>{

    if(!err)
    res.send(row)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })

})




router.put('/items/:item_id', (req, res) => {
  let emp = req.body
  let query = 'update item set item_name = ?, item_category = ?, item_desc = ?, item_location = ?,\
   item_room = ?, found_by = ?, found_by_desc = ?, date_found = ?, claimed_by =?, claimed_desc = ? where item_id = ?'
  mysqlConnection.query(query,[emp.item_name,emp.item_category,emp.item_desc,emp.item_location,emp.item_room,emp.found_by,emp.found_by_desc,emp.date_found,emp.claimed_by,emp.claimed_desc,req.params.item_id],(err,row,fields)=>{
    
    if(row.affectedRows!=0){
      res.send(`Updated ${req.params.item_id}`)
      
    }
    else{
      let errorMessage = {
        status:400,
        message: `Cannot update ${req.params.item_id} since it doesnt exist in database` 
      }
      res.status(400)
      res.send(errorMessage)
      

    }
    
    
  })
})


//DELETE item
router.delete('/items/:item_id', (req, res) => {
  mysqlConnection.query('Delete from item where item_id = ?',[req.params.item_id],(err,row,fields)=>{
    
    if(row.affectedRows!=0){
      res.send(`Deleted ${req.params.item_id}`)
      
    }
    else{
      let errorMessage = {
        status:400,
        message: `Cannot delete ${req.params.item_id} since it doesnt exist in database` 
      }
      res.status(400)
      res.send(errorMessage)
      

    }
    
    
  })
})


module.exports = router;
