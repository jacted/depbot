import App from './containers/App'

function errorLoading(err) {
  console.error('Dynamic page loading failed', err)
}

function loadRoute(cb) {
  return (module) => cb(null, module.default)
}

export default {
  childRoutes: [
    {
      path: '/projects/create',
      getComponent(location, cb) {
        System.import('./pages/Project/Manipulate')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/projects/:projectID/edit',
      getComponent(location, cb) {
        System.import('./pages/Project/Manipulate')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    },
    {
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
          path: '/projects/:projectID',
          getComponent(location, cb) {
            System.import('./pages/Project')
              .then(loadRoute(cb))
              .catch(errorLoading)
          }
        }
      ]
    }
  ]
}