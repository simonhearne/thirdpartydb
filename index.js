const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const mysql = require('mysql')
const jwt = require('express-jwt')
const compression = require('compression')
const url = require('url')

const config = require('./config.js')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(compression())

var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require(`./config/${config.swagger}`)

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
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static('public'))

app.listen(config.server.port, () => {
  console.log(`Server running on http://${config.server.host}:${config.server.port}`)
})
