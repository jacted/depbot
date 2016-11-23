import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getProject, deleteProject } from '../../actions/projects'

import './project.scss'

class Project extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: {}
    }
    this.deleteProject = this.deleteProject.bind(this)
  }

  componentDidMount () {
    this.getProject(this.props.params.projectID)
  }

  deleteProject () {
    this.props.deleteProject(this.props.params.projectID).then((res) => {
      this.context.router.push('/')
    }, (err) => {
      console.log(err)
    })
  }

  getProject (id) {
    this.props.getProject(id).then((res) => {
    }, (err) => {
      this.context.router.push('/')
    })
  }

  renderProjectInformation () {
    let { project } = this.props
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
    let { project } = this.props
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
    let { project } = this.props
    if (Object.keys(project).length === 0) {
      return <div />
    }
    return (
      <div className='project__screen'>
        <div id='subheader' className='clearfix'>
          <h1>Project: {project.name}</h1>
          <a className='delete' onClick={this.deleteProject}>Delete</a>
        </div>
        <div id='content'>
          {this.renderProjectInformation()}
          {this.renderProjectInformationFtp()}
        </div>
      </div>
    )
  }
}

Project.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    project: state.projects.project
  }
}

export default connect(mapStateToProps, { getProject, deleteProject })(Project)