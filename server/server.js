const path = require('path')
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const xhub = require('express-x-hub')
const DeployerJS = require('deployer-js')
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
server.post('/git/webhook', (req, res) => {

  if(!req.isXHub || !req.isXHubValid()){
    res.status(401).end('Wrong signature.')
  } else {

    let project = config.projects[0]

    if (req.body.ref === 'refs/heads/' + project.git.branch) {
    
      try {

        let deployer = new DeployerJS({
          ftp: project.ftp,
          git: project.git
        })

        /*
        deployer.deployAllFiles().then((res) => {
          console.log(res) 
        }, (err) => {
          console.log(err)
        })
        */

        res.end('OK - Deploying')

      } catch (e) {
        res.status(500).end(e)
      }
      
    } else {
      res.end('OK - Not deploying')
    }

  }

})

server.listen(config.port, function () {})