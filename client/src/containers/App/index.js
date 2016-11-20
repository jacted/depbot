import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const App = (props) => (
  <div className='viewport'>
    <div id='header' className='clearfix'>
      <h1>DEPBOT</h1>
      <ul>
        <li><Link to='/' activeClassName='active'>Projects</Link></li>
      </ul>
    </div>
    {props.children}
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App