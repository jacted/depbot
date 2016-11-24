import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject, getProject, saveProject } from '../../../actions/projects'

import './manipulate.scss'

class ProjectManipulate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'create',
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
        },
        slack: {
          hook: ''
        }
      }
    }
    this.createProject = this.createProject.bind(this)
    this.editProject = this.editProject.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.goBack = this.goBack.bind(this)
    this.changeProjectType = this.changeProjectType.bind(this)
  }

  componentDidMount () {
    if (this.props.params.projectID) {
      this.getProject(this.props.params.projectID)
      this.setState({
        type: 'edit'
      })
    }
  }

  goBack () {
    if (this.props.params.projectID) {
      this.context.router.push('/projects/' + this.props.params.projectID)
    } else {
      this.context.router.push('/')
    }
  }

  getProject (id) {
    this.props.getProject(id, true).then((res) => {
      this.setState({
        project: this.props.project
      })
    }, (err) => {
      this.context.router.push('/')
    })
  }

  createSaveError (err) {
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
  }

  createProject (e) {
    e.preventDefault()
    this.setState({ errors: [], isLoading: true })
    this.props.createProject(this.state.project).then((res) => {
      this.context.router.push('/projects/' + res.data.id)
    }, (err) => {
      this.createSaveError(err)
    })
  }

  editProject (e) {
    e.preventDefault()
    this.props.saveProject(this.state.project, this.props.params.projectID).then((res) => {
      this.context.router.push('/projects/' + this.props.params.projectID)
    }, (err) => {
      this.createSaveError(err)
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

  inputChangeNested (index, e) {
    this.setState({
      project: {
        ...this.state.project,
        [index]: {
          ...this.state.project[index],
          [e.target.name]: e.target.value
        }
      }
    })
  }

  renderSlackSection () {
    return (
      <div>
        <h3>Slack</h3>
        <div className='form-group'>
          <label>Incoming webhook</label>
          <input type='text' name='hook' value={this.state.project.slack.hook} autoComplete='off' onChange={this.inputChangeNested.bind(this, 'slack')} />
        </div>
      </div>
    )
  }

  renderGitSection () {
    return (
      <div>
        <h3>Git</h3>
        <div className='form-group'>
          <label>Git clone url</label>
          <input type='text' name='repo' placeholder='https://github.com/jacted/depbot.git' value={this.state.project.git.repo} onChange={this.inputChangeNested.bind(this, 'git')} autoComplete='off' />
        </div>
        <div className='form-group'>
          <label>Git branch</label>
          <input type='text' name='branch' value={this.state.project.git.branch} onChange={this.inputChangeNested.bind(this, 'git')} autoComplete='off' />
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
          <input type='text' name='host' value={this.state.project.ftp.host} onChange={this.inputChangeNested.bind(this, 'ftp')} autoComplete='off' />
        </div>
        <div className='form-group'>
          <label>Port</label>
          <input type='text' name='port' value={this.state.project.ftp.port} onChange={this.inputChangeNested.bind(this, 'ftp')} autoComplete='off' />
        </div>
        <div className='form-group'>
          <label>Username</label>
          <input type='text' name='username' value={this.state.project.ftp.username} onChange={this.inputChangeNested.bind(this, 'ftp')} autoComplete='off' />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input type='text' name='password' value={this.state.project.ftp.password} onChange={this.inputChangeNested.bind(this, 'ftp')} autoComplete='off' />
        </div>
        <div className='form-group'>
          <label>Path</label>
          <input type='text' name='path' value={this.state.project.ftp.path} onChange={this.inputChangeNested.bind(this, 'ftp')} placeholder='/var/www/site.com/public_html' autoComplete='off' />
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
  }

  renderWizard () {
    let renderStep = ''
    let projectType = parseInt(this.state.project.type)

    if (this.state.type === 'edit' || projectType === 1) {
      renderStep = (
        <div className='group__wrap'>
          <form onSubmit={this.props.params.projectID ? this.editProject : this.createProject}>
            <span className='subtitle'>
              <input placeholder='Project name' type='text' name='name' value={this.state.project.name} onChange={this.inputChange} autoComplete='off' />
            </span>
            {this.renderErrors()}
            {this.renderSlackSection()}
            {this.renderGitSection()}
            {this.renderFtpSection()}
            <div className='form-group'>
              <button disabled={this.state.isLoading}>{this.props.params.projectID ? 'Edit project' : 'Create project'}</button>
            </div>
          </form>
        </div>
      )
    } else if (projectType === 0) {
      renderStep = this.renderStepChooseProject()
    }

    return (
      <div>
        <h2>{this.props.params.projectID ? 'Edit project' : 'Create new project'}</h2>
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
        <div className='back' onClick={this.goBack}>&times;</div>
        {this.renderWizard()}
      </div>
    )
  }
}

ProjectManipulate.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    project: state.projects.project
  }
}

export default connect(mapStateToProps, { createProject, getProject, saveProject })(ProjectManipulate)