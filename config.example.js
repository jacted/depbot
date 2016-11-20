let config = {
  port: 1337,
  webhookSecret: '1234',
  projects: {
    'jacted/static-site':  {
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