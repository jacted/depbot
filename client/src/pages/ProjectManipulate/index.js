import React, { Component } from 'react'
import { getProject, createProject, saveProject } from '../../data/projects'

import './projectemanipulate.scss'

class ProjectManipulate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      errors: [],
      project: {
        name: '',
        type: 0,
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
    this.backToProjects = this.backToProjects.bind(this)
    this.changeProjectType = this.changeProjectType.bind(this)
  }

  componentDidMount () {
  }

  backToProjects () {
    this.props.router.push('/')
  }

  createProject (e) {
    e.preventDefault()
    this.setState({ errors: [], isLoading: true })
    createProject(this.state.project).then((res) => {
      this.props.router.push('/project/' + res.data.id)
    }, (err) => {
      if (typeof err.response.data.errors !== 'undefined') {
        this.setState({
          isLoading: false,
          errors: err.response.data.errors
        })
      } else {
        this.setState({
          isLoading: false,
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

  renderGitSection () {
    return (
      <div>
        <h3>Git</h3>
        <div className='form-group'>
          <label>Git clone url</label>
          <input type='text' name='repo' placeholder='https://github.com/jacted/depbot.git' value={this.state.project.git.repo} onChange={this.gitInputChange} autoComplete='off' />
        </div>
        <div className='form-group'>
          <label>Git branch</label>
          <input type='text' name='branch' value={this.state.project.git.branch} onChange={this.gitInputChange} autoComplete='off' />
        </div>
      </div>
    )
  }

  renderFtpSection () {
    return (
      <div>
        <h3>FTP</h3>
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

  changeProjectType (type) {
    this.setState({
      project: {
        ...this.state.project,
        type: type
      }
    })
    setTimeout(() => {
      console.log(this.state.project.type)
    }, 50)
  }

  renderWizard () {
    let renderStep = ''

    if (this.state.project.type === 0) {
      renderStep = this.renderStepChooseProject()
    } else if (this.state.project.type === 1) {
      renderStep = (
        <div className='group__wrap'>
          <form onSubmit={this.createProject}>
            <span className='subtitle'>
              <input placeholder='Project name' type='text' name='name' value={this.state.project.name} onChange={this.inputChange} autoComplete='off' />
            </span>
            {this.renderErrors()}
            {this.renderGitSection()}
            {this.renderFtpSection()}
            <div className='form-group'>
              <button disabled={this.state.isLoading}>Create project</button>
            </div>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>Create new project</h2>
        {renderStep}
      </div>
    )
  }

  renderStepChooseProject () {
    return (
      <div>
        <span className='subtitle'>Choose a project type</span>
        <ul>
          <li onClick={() => this.changeProjectType(1)}>
            <strong>FTP</strong>
            <p>
              Deployment using FTP.
            </p>
            <div>Start deploying using FTP</div>
          </li>
          <li onClick={() => window.alert('Feature is coming soon.')}>
            <strong>SSH</strong>
            <p>
              Deployment using SSH.
            </p>
            <div>Start deploying using SSH</div>
          </li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div className='projectcreate__screen'>
        <div className='back' onClick={this.backToProjects}>&times;</div>
        {this.renderWizard()}
      </div>
    )
  }
}

export default ProjectManipulate
