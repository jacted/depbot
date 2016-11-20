const DeployerJS = require('deployer-js')
const config = require('../config')

module.exports = (server) => {

  // API for front-end
  server.get('/api/projects', (req, res) => {
    let projects = []
    for (let val in config.projects) {
      projects.push({
        id: val,
        name: config.projects[val].name
      })
    }
    res.json(projects)
  })

  server.get('/api/projects/:projectID', (req, res) => {
    let project = config.projects[req.params.projectID]
    if (typeof project === 'undefined') {
      return res.status(500).json({
        msg: 'Project not found'
      })
    }
    res.json({
      id: req.params.projectID,
      name: project.name,
      git: project.git
    })
  })

  // Git webhook
  server.post('/git/webhook', (req, res) => {
    if (!req.isXHub || !req.isXHubValid()) {
      res.status(401).end('Wrong signature.')
    } else {

      // Get project
      let project = config.projects[req.body.repository.name]
      if (typeof project === 'undefined') {
        res.status(500).end('Project does not exist.')
        return false
      }

      if (req.body.ref === 'refs/heads/' + project.git.branch) {
      
        try {

          let deployer = new DeployerJS({
            ftp: project.ftp,
            git: project.git
          })

          deployer.deployCommitedFiles(req.body.commits).then((res) => {
            console.log(res)
          }, (err) => {
            console.log(err)
          })

          res.end('OK - Deploying')

        } catch (e) {
          console.log(e)
          res.status(500).end('Error')
        }
        
      } else {
        res.end('OK - Not deploying')
      }

    }
  })

}