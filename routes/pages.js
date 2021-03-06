'use strict'
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
        logedIn:`Logged in as ${req.session.email}`,
        isOfficer:req.session.admin
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
  mysqlConnection.query('Select password, is_admin from user where email =? ',email, async (err,rows,fields)=>{

  console.log(`Trying to Log In as ${email}`);
  if(err){
    //console.log("Wrong Email or Password")
    res.status(400);
    return res.render('login',{

        message:'Wrong Email or Password!'
    })
  }
  else if(rows.length==0) {
    res.status(400);
    console.log("Wrong Email or Password")
    return res.render('login',{
        message:'Wrong Email or Password!'
    })
  }
  
  else if(password== await rows[0].password){//THIS LOGS YOU IN
  console.log("Logged IN!")
  req.session.email = email;
  req.session.admin = rows[0].is_admin;
  console.log(rows[0].is_admin)
  res.redirect(200,'/')
  }else{
    res.status(400)
    return res.render('login',{
        message:`Wrong Email or Password!`
    })
  }

});
  
})


router.get('/logout', (req, res) => {

        

      if(req.session.email){
        req.session.destroy()
        req.session=null;
        
        res.redirect(200,'/')
      }else{
        res.redirect(400,'/')
      }
    
})


/*
8.	Non admin users ??? 
Students should have access to a menu of item categories. For example, clothes, keys, flash drives, etc. 
When they select a category, a report of the item, its ID (like flash drive 1) and the date recovered should be shown. 
*/

router.get('/lostItems', (req, res) => {
  if(req.session.email){
    return res.render('lostItems',{
      logedIn:req.session.email,
      isOfficer:req.session.admin
  })
  }
    
  else
    res.redirect('/login')
})



/*
7.	Admin user ??? Work in Progress
police members should have admin access to the data that allows them to operate the application. 
Each police officer should have their own ID.  
Non-admin users (e.g., students or facility) can only pursue the general categories of items found and not yet claimed. 
*/

router.get('/admin', (req, res) => {
  //TODO: make sure only admins can access it.
  //Should make the session know its an admin so we can display admin only links
  if(req.session.admin){
    return res.render('admin',{
      isOfficer: req.session.admin,
      logedIn:req.session.email
  })
  }
  else {
    res.redirect('/login')
  }
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


router.get('/users/:user_id', (req, res) => {
  mysqlConnection.query('Select * from user where user_id = ?',[req.params.user_id],(err,row,fields)=>{

    if(row.length>0){
      res.status(200)
      res.send(row)}
    else {
      let errorMessage = {
        status:400,
        message:`No user found with ${req.params.user_id}`
      }
      res.status(400)
      console.log(errorMessage);
      res.send(errorMessage);
    }
  })
})

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
  let emp = req.body;

  mysqlConnection.query('insert into location (location_name,floor_num,room_num,hasBasement) Values (?,?,?,?)',[emp.location_name,emp.floor_num,emp.room_num,emp.hasBasement],(err,row,fields)=>{

    if(!err){

    
    res.status(200)
    res.send(row)
    }
   // console.log(rows[0].floors)
    else{
    res.status(200)
    console.log(err);
    }
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
      let message = {
        status:200,
        message: `Deleted ${req.params.location_name}`
      }
      res.status(200)
      res.send(message)
      
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
  mysqlConnection.query('Select * from item where item_category = ? ',[req.params.category],(err,rows,fields)=>{

    if(!err)
    res.send(rows)
   // console.log(rows[0].floors)
    else
    console.log(err);
    
  })

})

router.get('/item/:item_id', (req, res) => {
  mysqlConnection.query('Select * from item where item_id = ? ',[req.params.item_id],(err,rows,fields)=>{

    if(rows.length>0)
      res.send(rows)
    // console.log(rows[0].floors)
    else{
      let errorMessage = {
        status:400,
        message: `No item with id ${req.params.item_id}`
      }
      res.status(400)
      res.send(errorMessage)

    }


  })

})





router.post('/items', (req, res) => {

  let emp = req.body;

  mysqlConnection.query
  ('insert into item (item_id,item_name,item_category,item_value,item_desc,item_location,item_outside,item_room,found_by,found_by_desc,date_found) Values (?,?,?,?,?,?,?,?,?,?,?)',
  [emp.item_id,emp.item_name,emp.item_category,emp.item_value,
    emp.item_desc,emp.item_location,emp.item_outside,emp.item_room,emp.found_by,emp.found_by_desc,emp.date_found],(err,row,fields)=>{

    if(!err){

    let message = {
      status:200,
      message: `Item ${emp.item_name} has been added to DB` 
    }
    res.status(200)
    res.send(message)
  }
   // console.log(rows[0].floors)
    else{
      console.log(err)
      res.status(400)
      res.send(err)
    }
    
    
  })

})




router.put('/items/:item_id', (req, res) => {
  let emp = req.body
  let query = 'update item set item_id =?, item_name = ?, item_category = ?, item_value =?, item_desc = ?, item_location = ?,\
   item_room = ?, found_by = ?, found_by_desc = ?, date_found = ?, claimed_by =?, claimed_desc = ? where item_id = ?'
  mysqlConnection.query(query,[emp.item_id,emp.item_name,emp.item_category,emp.item_value,emp.item_desc,emp.item_location,emp.item_room,emp.found_by,emp.found_by_desc,emp.date_found,emp.claimed_by,emp.claimed_desc,req.params.item_id],(err,row,fields)=>{
    
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
      let errorMessage = {
        status:200,
        message: ` deleted ${req.params.item_id}` 
      }
      
      res.status(200)
      res.send(errorMessage)
      
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
