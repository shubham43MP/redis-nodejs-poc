const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const redis = require('redis')

// Create Redis Client
let client = redis.createClient()

client.on('connect', function () {
  console.log('REDIS CONNECTED')
})

// Set Port

const port = 3000

// Init App
const app = express()

// View Engine -- This is purely optional. It just gives more interactive environment
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Set Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// Method Override
app.use(methodOverride('_method'))

//Search Page
app.get('/', function(req, res, next){
  res.render('searchusers')
})

// Search Processing - Templating request. Looks Cool
app.post('/user/search', function (req, res, next) {
  let id = req.body.id
  client.hgetall(id, function(err, obj) {
    if(!obj) {
      res.render('searchusers', {
        error: 'User does not exist'
      })
    } else {
      obj.id = id
      res.render('details', {
        user: obj
      })
    }
  })
})

//Add User Page
app.get('/user/add', function(req, res, next){
  res.render('adduser')
})

//Process Add User Page
app.post('/user/add', function(req, res, next){
  let { id, first_name = '', last_name = '', email = '', phone = '' } = req.body
  client.hmset(id, [
    'first_name', first_name,
    'last_name', last_name,
    'email', email,
    'phone', phone
  ], function (err, reply) {
    if(err){
      console.log('Error occures', err)
    }
    console.log(reply)
    res.redirect('/')
  }
)})


// Purely backend

app.post('/user/search-backend', function (req, res, next) {
  console.log('req', req.body)
  let id = req.body.id
  if(id) {
    client.hgetall(id, function(err, obj) {
      if(!obj) {
        res.sendStatus(404)
      } else {
        obj.id = id
        res.status(200).send(obj)
      }
    })
  } else {
    console.log('Error Thrown')
    res.sendStatus(404)
  }
})

app.listen(port, function () {
  console.log('Server started on', port)
})