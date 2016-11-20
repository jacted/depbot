import App from './containers/App'

function errorLoading(err) {
  console.error('Dynamic page loading failed', err)
}

function loadRoute(cb) {
  return (module) => cb(null, module.default)
}

export default {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('./pages/Home')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/project/:projectID',
      getComponent(location, cb) {
        System.import('./pages/Project')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/projects/create',
      getComponent(location, cb) {
        System.import('./pages/ProjectCreate')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    }
  ]
};