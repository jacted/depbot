const DeployerJS = require('deployer-js')
const config = require('../config')

module.exports = (server) => {

  // API to get all projects
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

  // Api to get single project
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
      git: project.git,
      ftp: project.ftp
    })
  })

}