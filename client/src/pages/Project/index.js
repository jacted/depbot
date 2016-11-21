import React, { Component } from 'react'
import { Link } from 'react-router'
import { getProject } from '../../data/projects'

import './project.scss'

class Project extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: {}
    }
  }

  componentDidMount () {
    this.getProject(this.props.params.projectID)
  }

  getProject (id) {
    getProject(id).then((res) => {
      this.setState({
        project: res.data
      })
    }, (err) => {
      this.props.router.push('/projects')
    })
  }

  renderProjectInformation () {
    let { project } = this.state
    return (
      <div className='box'>
        <div className='box--content'>
          <h2>General</h2>
          <ul>
            <li><span>ID:</span> {project.id}</li>
            <li><span>Name:</span> {project.name}</li>
            <li><span>Git repo:</span> {project.git.repo}</li>
            <li><span>Git branch:</span> {project.git.branch || 'master'}</li>
          </ul>
        </div>
      </div>
    )
  }

  renderProjectInformationFtp () {
    let { project } = this.state
    return (
      <div className='box'>
        <div className='box--content'>
          <h2>FTP</h2>
          <ul>
            <li><span>Host:</span> {project.ftp.host}:{project.ftp.port}</li>
            <li><span>Username:</span> {project.ftp.username}</li>
            <li><span>Path:</span> {project.ftp.path}</li>
            <li><span>Continue on error:</span> {project.ftp.continueOnError ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      </div>
    )
  }

  render () {
    let { project } = this.state
    if (Object.keys(project).length === 0) {
      return <div />
    }
    return (
      <div className='project__screen'>
        <div id='subheader' className='clearfix'>
          <h1>Project: {project.name}</h1>
          <Link to={'/project/' + project.id + '/edit'}>Edit project</Link>
        </div>
        <div id='content'>
          {this.renderProjectInformation()}
          {this.renderProjectInformationFtp()}
        </div>
      </div>
    )
  }
}

export default Project
