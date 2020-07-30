import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blog'
import Notifications from './components/Notification'

import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import UsersInformation from './components/UsersInformation'

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
      {notificationField()}
      <Blogs user={user}/>
      {newBlogForm()}
      <UsersInformation/>
    </div>
  )
}

export default App