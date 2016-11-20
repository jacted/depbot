const DeployerJS = require('deployer-js')
const config = require('../config')

module.exports = (server, db) => {

  // API to get all projects
  server.get('/api/projects', (req, res) => {
    let response = []
    let projects = db.get('projects').value()
    projects.forEach((val, index) => {
      response.push({
        id: val.id,
        name: val.name
      })
    })
    res.json(response)
  })

  // Api to get single project
  server.get('/api/projects/:projectID', (req, res) => {
    let project = db.get('projects').getById(req.params.projectID).value()
    if (typeof project === 'undefined') {
      return res.status(500).json({
        msg: 'Project not found'
      })
    }
    // Remove password from the object
    delete project.ftp.password
    // Response
    res.json({
      id: req.params.projectID,
      name: project.name,
      git: project.git,
      ftp: project.ftp
    })
  })

  // Api to add project
  server.post('/api/projects', (req, res) => {
    // Validate input

    // Find repo name
    let reponame = 'static-site'

    // Insert project
    const projectID = db.get('projects').insert({ 
      name: req.body.name,
      git: req.body.git,
      ftp: req.body.ftp,
      reponame: reponame
    }).value().id

    res.json({
      id: projectID
    })
  })

}