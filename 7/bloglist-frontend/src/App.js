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
import SingleBlogView from './components/SingleBlogView'
import NavigationMenu from './components/NavigationMenu'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {

  const user = useSelector(state => state.users)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  




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
        <NavigationMenu user={user}/>
        {notificationField()}
        <Switch>
          <Route path='/users/:id'>
            <SingleUserView/>
          </Route>
          <Route path='/blogs/:id'>
            <SingleBlogView/>
          </Route>
          <Route path='/users'>
            <UsersInformation/>
          </Route>
          <Route path=''>
            <h2>blog app</h2>
            {newBlogForm()}
            <Blogs user={user}/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App