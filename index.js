const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const mysql = require('mysql')
const jwt = require('express-jwt')
const compression = require('compression')

const config = require('./config.js')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(compression())
app.use(function(req,res,next){
  res.locals.connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database
  })
  res.locals.connection.connect()
  next()
})

app.use('/api/v1',routes)

app.listen(config.server.port, () => {
  console.log(`Server running on http://${config.server.host}:${config.server.port}`)
})
