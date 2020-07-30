export const addError = (error) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_ERROR',
      data: error
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_ERROR':
      return action.data
    case 'REMOVE_ERRORS':
      return []
    default:
      return state
  }
}

export default reducer