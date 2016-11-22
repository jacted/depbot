let initialState = {
  projects: [],
  project: {}
}

const projects = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.projects
      }
    case 'SET_PROJECT':
      return {
        ...state,
        project: action.project
      }
    default:
      return state
  }
}


export default projects