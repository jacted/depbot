import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getProjects } from '../../actions/projects'

import './home.scss'

class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    this.props.getProjects()
  }

  renderProject (val, index) {
    return (
      <div className='box' key={index}>
        <div className='box--content'>
          <span className='box--content-type'>{val.type === '1' ? 'FTP' : 'SSH'}</span>
          <h2>{val.name}</h2>
        </div>
        <div className='box--footer'>
          <Link to={'/projects/' + val.id}>View project</Link>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='projects__screen'>
        <div id='subheader' className='clearfix'>
          <h1>Projects</h1>
          <Link to='/projects/create'>Create project</Link>
        </div>
        <div id='content'>
          {this.props.projects.map(this.renderProject)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects
  }
}

export default connect(mapStateToProps, { getProjects })(Home)
