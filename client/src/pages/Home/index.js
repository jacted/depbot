import React, { Component } from 'react'
import { Link } from 'react-router'
import { getProjects } from '../../data/projects'

import './home.scss'

class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    this.getProjects()
  }

  getProjects () {
    getProjects().then((res) => {
      this.setState({
        projects: res.data
      })
    }, (err) => {
      console.log(err)
    })
  }

  renderProject (val, index) {
    return (
      <div className='box' key={index}>
        <div className='box--content'>
          <span className='box--content-type'>{val.type === '1' ? 'FTP' : 'SSH'}</span>
          <h2>{val.name}</h2>
        </div>
        <div className='box--footer'>
          <Link to={'/project/' + val.id}>View project</Link>
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
          {this.state.projects.map(this.renderProject)}
        </div>
      </div>
    )
  }
}

export default Home
