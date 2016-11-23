var axios = require('axios')

module.exports = {
  send: (url, project, success) => {
    if (!!!url) { return false }
    let colorCode = (success) ? '#36a64f' : '#ff0000'
    let status = (success) ? 'Success' : 'Failure'
    let data = {
      icon_emoji: ':robot_face:',
      color: colorCode,
      attachments: [
        {
          fallback: project + ' deployment | Status: ' + status,
          color: '#36a64f',
          title: project + ' deployment',
          text: 'Depbot deployment review',
          fields: [
            {
              title: 'Status',
              value: status,
              short: false
            }
          ],
          footer: 'Depbot',
          ts: Math.round(new Date().getTime()/1000)
        }
      ]
    }
    axios.post(url, data)
  }
}