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
      path: '/project',
      getComponent(location, cb) {
        System.import('./pages/Project')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    }
  ]
};