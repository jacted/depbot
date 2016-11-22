import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

// Routes
import rootRoute from './routes'

// General stles
import 'general.scss'

// Store
let store = createStore(
  reducers,
  applyMiddleware(thunk)
)


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={rootRoute} />
  </Provider>, 
  document.getElementById('root')
)