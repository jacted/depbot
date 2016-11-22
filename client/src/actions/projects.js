import axios from 'axios'
const config = require('../../../config')

export const setProjects = (projects) => {
  return {
    type: 'SET_PROJECTS',
    projects
  }
}

export const setProject = (project) => {
  return {
    type: 'SET_PROJECT',
    project
  }
}

export function getProjects () {
  return dispatch => {
    return axios.get(config.API_URL + '/projects').then((res) => {
      dispatch(setProjects(res.data))
    })
  }
}

export function getProject (id, keepPassword) {
  return dispatch => {
    let param = (keepPassword) ? '?keeppassword=true' : ''
    return axios.get(config.API_URL + '/projects/' + id + '' + param).then((res) => {
      dispatch(setProject(res.data))
    })
  }
}

export function createProject (data) {
  return dispatch => {
    return axios.post(config.API_URL + '/projects', data)
  }
}

export function saveProject (data, id) {
  return dispatch => {
    return axios.post(config.API_URL + '/projects/' + id, data)
  }
}

export function deleteProject (id) {
  return dispatch => {
    return axios.delete(config.API_URL + '/projects/' + id)
  }
}