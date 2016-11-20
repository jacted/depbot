import React, { Component } from 'react'
import { createProject } from '../../data/projects'

import './projectcreate.scss'

class ProjectCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: [],
      project: {
        name: '',
        ftp: {
          host: '',
          port: '21',
          username: '',
          password: '',
          path: ''
        },
        git: {
          repo: '',
          branch: 'master'
        }
      }
    }
    this.createProject = this.createProject.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.gitInputChange = this.gitInputChange.bind(this)
    this.ftpInputChange = this.ftpInputChange.bind(this)
  }

  createProject (e) {
    e.preventDefault()

    this.setState({
      errors: []
    })

    createProject(this.state.project).then((res) => {
      this.props.router.push('/project/' + res.data.id)
    }, (err) => {
      if (typeof err.response.data.errors !== 'undefined') {
        this.setState({
          errors: err.response.data.errors
        })
      } else {
        this.setState({
          errors: [
            {
              msg: 'Something went wrong with the network connection. Please try again.'
            }
          ]
        })
      }
    })

  }

  inputChange (e) {
    this.setState({
      project: {
        ...this.state.project,
        [e.target.name]: e.target.value
      }
    })
  }

  gitInputChange (e) {
    this.setState({
      project: {
        ...this.state.project,
        git: {
          ...this.state.project.git,
          [e.target.name]: e.target.value
        }
      }
    })
  }

  ftpInputChange (e) {
    this.setState({
      project: {
        ...this.state.project,
        ftp: {
          ...this.state.project.ftp,
          [e.target.name]: e.target.value
        }
      }
    })
  }

  renderGeneralSection () {
    return (
      <div className='box'>
        <div className='box--content'>
          <h2>General</h2>
          <div className='form-group'>
            <label>Name</label>
            <input type='text' name='name' value={this.state.project.name} onChange={this.inputChange} autoComplete='off' />
          </div>
          <div className='form-group'>
            <label>Git clone url</label>
            <input type='text' name='repo' placeholder='https://github.com/jacted/depbot.git' value={this.state.project.git.repo} onChange={this.gitInputChange} autoComplete='off' />
          </div>
          <div className='form-group'>
            <label>Git branch</label>
            <input type='text' name='branch' value={this.state.project.git.branch} onChange={this.gitInputChange} autoComplete='off' />
          </div>
          <div className='form-group'>
            <button>Create project</button>
          </div>
        </div>
      </div>
    )
  }

  renderFtpSection () {
    return (
      <div className='box'>
        <div className='box--content'>
          <h2>FTP</h2>
          <div className='form-group'>
            <label>Host</label>
            <input type='text' name='host' value={this.state.project.ftp.host} onChange={this.ftpInputChange} autoComplete='off' />
          </div>
          <div className='form-group'>
            <label>Port</label>
            <input type='text' name='port' value={this.state.project.ftp.port} onChange={this.ftpInputChange} autoComplete='off' />
          </div>
          <div className='form-group'>
            <label>Username</label>
            <input type='text' name='username' value={this.state.project.ftp.username} onChange={this.ftpInputChange} autoComplete='off' />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type='text' name='password' value={this.state.project.ftp.password} onChange={this.ftpInputChange} autoComplete='off' />
          </div>
          <div className='form-group'>
            <label>Path</label>
            <input type='text' name='path' value={this.state.project.ftp.path} onChange={this.ftpInputChange} placeholder='/var/www/site.com/public_html' autoComplete='off' />
          </div>
        </div>
      </div>
    )
  }

  renderErrors () {
    if (this.state.errors.length === 0) return null

    return (
      <div className='alert errors'>
      {this.state.errors.map((val, index) => {
        return (
          <div key={index}>
            {val.msg}
          </div>
        )
      })}
      </div>
    )
  }

  render () {
    return (
      <div className='projectcreate__screen'>
        <div id='subheader' className='clearfix'>
          <h1>Create project</h1>
        </div>
        <div id='content'>
          {this.renderErrors()}
          <form onSubmit={this.createProject}>
            {this.renderGeneralSection()}
            {this.renderFtpSection()}
          </form>
        </div>
      </div>
    )
  }
}

export default ProjectCreate
