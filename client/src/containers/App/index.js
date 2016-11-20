import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const App = (props) => (
  <div className='viewport'>

    <div id='header' className='clearfix'>
      <h1>DEPLOYER</h1>

      <ul>
        <li><Link to='/' activeClassName='active'>Projects</Link></li>
        <li><Link to='/project' activeClassName='active'>Settings</Link></li>
        <li><Link to='/'>Sign out</Link></li>
      </ul>

    </div>

    <div id='subheader' className='clearfix'>
      <h1>Projects</h1>
      <a href='#'>Create project</a>
    </div>

    {props.children}

  </div>
);

App.propTypes = {
  children: PropTypes.node
}

export default App