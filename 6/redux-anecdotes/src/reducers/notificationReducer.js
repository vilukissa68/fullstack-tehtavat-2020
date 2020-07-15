const notificationAtStart = "Hello world"

export const setNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    content: content
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