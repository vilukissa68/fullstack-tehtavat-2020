import React from 'react'
import LogoutButton from './Logout'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const NavigationMenu = (user) => {

  const dispatch = useDispatch()

  const handleLogout = (event) => {
  console.log('Loggin out')
  event.preventDefault()
  window.localStorage.removeItem('loggedBlogappUser')
  dispatch(setNotification('logged out!', 'notification', 5))
  }

  const padding = {
    paddingRight: 5
  }

  return(
    <div>
      <Link style={padding} to='/blogs'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {user.user.name} logged in <LogoutButton handleLogout={handleLogout}/>
    </div>
  )
}

export default NavigationMenu