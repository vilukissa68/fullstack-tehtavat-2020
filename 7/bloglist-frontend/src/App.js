import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notifications from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LogoutButton from './components/Logout'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = () => {
    blogs.sort((a,b) => b.likes - a.likes)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      dispatch(setNotification('wrong username or password', 'error', 5))}
  }

  const handleLogout = (event) => {
    console.log('Loggin out')
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification('logged out!', 'notification', 5))
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog =>
        setBlogs(blogs.concat(returnedBlog))
      )
    dispatch(setNotification('new blog added!', 'notification', 5))
  }

  const likeBlog = (id, blogObject) => {
    blogService.update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      dispatch(setNotification('liked <3', 'notification', 5))
  }

  const deleteBlog = (id) => {
    blogService.remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        dispatch(setNotification('blog deleted', 'notification', 5))
      })

      .catch(error => {
        dispatch(setNotification(`failed to delete blog ${error}`, 'error', 5))
      })
  }

  const loginForm = () => (
    <div>
      <h1>login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text"
            id='username-field'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password"
            id='password-field'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )

  const noteForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <LogoutButton handleLogout={handleLogout}/></p>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          user={user}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}/>
      )}
    </div>
  )

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
        {loginForm()}
      </div>
    )
  }
  sortBlogs()
  return (
    <div>
      {notificationField()}
      {noteForm()}
      {newBlogForm()}
    </div>
  )
}

export default App