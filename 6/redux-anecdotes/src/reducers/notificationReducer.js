const notificationAtStart = "Hello world"

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch({
    type: 'SET_NOTIFICATION',
    content: content
    })
    setTimeout(() => {dispatch(removeNotification())}, timeout*1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

const reducer = (state = notificationAtStart, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default reducer