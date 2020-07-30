import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification} from '../reducers/notificationReducer'

const emptyUser = null

export const login = ({username, password}) => {
   return async dispatch => {
     try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch(error) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }
}

export const setUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

const reducer = (state = emptyUser, action) => {
  switch(action.type){
    case 'LOGIN':
      return action.data
    case 'SET_USER':
      return action.data
    case 'LOGIN_FAILED':
      return 
    default:
      return state
  }
}

export default reducer