import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router,
Switch, Route } from 'react-router-dom'

import Blogs from './components/Blog'
import Notifications from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UsersInformation from './components/UsersInformation'
import SingleUserView from './components/SingleUserView'
import LogoutButton from './components/Logout'

import { setNotification } from './reducers/notificationReducer'
import { createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {

  const user = useSelector(state => state.users)

  const dispatch = useDispatch()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogout = (event) => {
    console.log('Loggin out')
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification('logged out!', 'notification', 5))
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject)) 
    dispatch(setNotification('new blog added!', 'notification', 5))
  }

  const blogFormRef = useRef()

  const newBlogForm = () => (
    <Togglable buttonLabel={'add a blog'} ref={blogFormRef}>
      <NewBlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const notificationField = () => (
    <div>
      <Notifications.Notification/>
    </div>
  )

  const GreetingField = () => {
    return(
      <div>
        <h1>blogs</h1>
        <p>{user.name} logged in <LogoutButton handleLogout={handleLogout}/></p>
      </div>
  )}

  if ( user === null ){
    return (
      <div>
        {notificationField()}
        <LoginForm/>
      </div>
    )
  }

  return (
    <div>
      <Router>
        {notificationField()}
        <GreetingField/>
        <Switch>
          <Route path='/users/:id'>
            <SingleUserView/>
          </Route>
          <Route path=''>
            <Blogs user={user}/>
            {newBlogForm()}
            <UsersInformation/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App