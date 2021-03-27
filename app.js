//https://www.youtube.com/watch?v=4fWWn2Pe2Mk
//https://aurora.edu/about/maps-directions/
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const { json } = require('body-parser')
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(bodyParser.json())
app.use(express.static('public'))


//for Staying logged in 
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser())
require('dotenv/config')
app.use(session({
  key:"email",
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires:60*60*24

  }
}))

//set views
app.set('views','./views')
app.set('view engine','hbs')
//this will be lashes db soon
//also put the info in a .env file for security reasons

const port = 5000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//Where all the get,post,put,deletes are.
app.use('/',require('./routes/pages'))
