const path = require('path')
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const xhub = require('express-x-hub')
const config = require('../config')

// Github secret + bodyparser
server.use(xhub({ algorithm: 'sha1', secret: config.webhookSecret }))
server.use(bodyParser.json())

// Serve client
server.use(express.static(path.join(__dirname, '../client/public')))
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

// API
require('./api')(server)

server.listen(config.port, function () {})