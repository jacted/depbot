const path = require('path')
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const xhub = require('express-x-hub')
const config = require('../config')
const low = require('lowdb')

// DB
const db = low('db.json', { storage: require('lowdb/lib/file-async') })
db._.mixin(require('underscore-db'))

// Init db
if (!db.has('projects').value()) {
  db.set('projects', []).value()
}

// Github secret + bodyparser
server.use(xhub({ algorithm: 'sha1', secret: config.webhookSecret }))
server.use(bodyParser.json())
server.use(expressValidator())

// API
require('./git')(server, db)
require('./api')(server, db)

// Serve client
server.use(express.static(path.join(__dirname, '../client/public')))
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

server.listen(config.port, function () {})