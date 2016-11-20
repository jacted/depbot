import React, { Component } from 'react'
import { Link } from 'react-router'

import './home.scss'

class Home extends Component {
  render () {
    return (
      <div>
        Home <br />
        <Link to='/project'>Project</Link>
      </div>
    )
  }
}

export default Home
