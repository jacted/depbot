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
    project.ftp.password = ''
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
    req.checkBody('name', 'Invalid name').notEmpty()
    req.checkBody('git[repo]', 'Invalid git repo').notEmpty()

    req.checkBody('ftp[host]', 'Invalid ftp host').notEmpty()
    req.checkBody('ftp[username]', 'Invalid ftp username').notEmpty()
    req.checkBody('ftp[password]', 'Invalid ftp password').notEmpty()
    req.checkBody('ftp[path]', 'Invalid ftp path').notEmpty()

    req.asyncValidationErrors().then(() => {

      // Validate FTP connection

      // Find repo name
      let re = /([^\/]+)\.git$/
      let foundReponame = req.body.git.repo.match(re)

      // Return 500 on reponame not found
      if (foundReponame === null) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Repository name not found.'
            }
          ]
        })
      }

      // Insert project
      const projectID = db.get('projects').insert({ 
        name: req.body.name,
        git: req.body.git,
        ftp: req.body.ftp,
        reponame: foundReponame[1]
      }).value().id

      res.json({
        id: projectID
      })
    }, (errors) => {
      res.status(400).json({
        errors: errors
      })
    })
  })

}