import axios from 'axios'
const config = require('../../../config')

export function getProjects () {
  return axios.get(config.API_URL + '/projects')
}

export function getProject (id, keepPassword) {
  let param = (keepPassword) ? '?keeppassword=true' : ''
  return axios.get(config.API_URL + '/projects/' + id + '' + param)
}

export function createProject (data) {
  return axios.post(config.API_URL + '/projects', data)
}

export function saveProject (data, id) {
  return axios.post(config.API_URL + '/projects/' + id, data)
}