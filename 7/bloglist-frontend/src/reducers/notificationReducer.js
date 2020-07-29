const notificationAtStart = ''
let timeoutID

export const setNotification = ( message, notificationType, timeout ) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message: message,
      notificationType: notificationType
    })
    window.clearTimeout(timeoutID)
    timeoutID = window.setTimeout(() => { dispatch(removeNotification())}, timeout*1000)
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
      return [action.message, action.notificationType]
    case 'REMOVE_NOTIFICATION':
      return [null, null]
    default:
      return state
  }
}

export default reducer