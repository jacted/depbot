let config = {
  API_URL: 'http://localhost:1337/api',
  port: 1337,
  webhookSecret: '1234',
  projects: {
    'REPO-NAME':  {
      name: 'Test 1',
      ftp: {
        host: '',
        port: '',
        username: '',
        password: ''
        path: '/public_html/', 
        continueOnError: false
      },
      git: {
        repo: '',
        branch: ''
      }
    }
  }
}

module.exports = config