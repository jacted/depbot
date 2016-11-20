import React, { Component } from 'react'
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
      console.log(err)
    })
  }

  renderProjectInformation () {
    let { project } = this.state
    return (
      <div className='box'>
        <div className='box--content'>
          <ul>
            <li><span>ID:</span> {project.id}</li>
            <li><span>Name:</span> {project.name}</li>
            <li><span>Git repo:</span> {project.git.repo}</li>
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
        </div>
        <div id='content'>
          {this.renderProjectInformation()}
        </div>
      </div>
    )
  }
}

export default Project
