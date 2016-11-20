import axios from 'axios'
const config = require('../../../config')

export function getProjects () {
  return axios.get(config.API_URL + '/projects')
}

export function getProject (id) {
  return axios.get(config.API_URL + '/projects/' + id)
}

export function createProject (data) {
  return axios.post(config.API_URL + '/projects', data)
}