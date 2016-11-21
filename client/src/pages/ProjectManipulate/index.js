import React, { Component } from 'react'
import { getProject, createProject, saveProject } from '../../data/projects'

import './projectemanipulate.scss'

class ProjectManipulate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: '',
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
      },
      projectname: ''
    }
    this.manipulateProject = this.manipulateProject.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.gitInputChange = this.gitInputChange.bind(this)
    this.ftpInputChange = this.ftpInputChange.bind(this)
  }

  componentDidMount () {
    if (typeof this.props.params.projectID === 'undefined') {
      this.setState({ type: 'create' })
    } else {
      this.setState({ type: 'edit' })
      this.getProject(this.props.params.projectID)
    }
  }

  getProject (id) {
    getProject(id, true).then((res) => {
      this.setState({
        project: res.data,
        projectname: res.data.name
      })
    }, (err) => {
      this.props.router.push('/projects')
    })
  }

  manipulateProject (e) {
    e.preventDefault()

    this.setState({ errors: [] })

    let manipulateType
    if (this.state.type === 'edit') {
      manipulateType = saveProject(this.state.project, this.props.params.projectID)
    } else {
      manipulateType = createProject(this.state.project)
    }


    manipulateType.then((res) => {
      if (this.state.type === 'edit') {
        this.props.router.push('/project/' + this.props.params.projectID)
      } else {
        this.props.router.push('/project/' + res.data.id)
      }
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
            <button>{this.state.type === 'edit' ? 'Save' : 'Create'} project</button>
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
    let title = 'Create project'
    if (this.state.type === 'edit') {
      if (typeof this.state.project.id === 'undefined') {
        return null
      }
      title = 'Edit: ' + this.state.projectname
    }
    
    return (
      <div className='projectmanipulate__screen'>
        <div id='subheader' className='clearfix'>
          <h1>{title}</h1>
        </div>
        <div id='content'>
          {this.renderErrors()}
          <form onSubmit={this.manipulateProject}>
            {this.renderGeneralSection()}
            {this.renderFtpSection()}
          </form>
        </div>
      </div>
    )
  }
}

export default ProjectManipulate
