import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notifications from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import LogoutButton from './components/Logout'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    console.log("Loggin out")
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setNotificationMessage('logged out!')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
    .then(returnedBlog =>
      setBlogs(blogs.concat(returnedBlog))
    )
    setNotificationMessage('new blog added!')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const likeBlog = (id, blogObject) => {
    blogService.update(id, blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    })
    setNotificationMessage('liked <3')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

  }

  const deleteBlog = (id) => {
    blogService.remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotificationMessage('blog deleted')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      })
      .catch(error => {
        setErrorMessage('failed to delete blog', error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => (
    <div>
      <h1>login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input type="text"
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
            <input type="password"
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
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
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}/>
      )}
    </div>
  )

  const blogFormRef = useRef()

  const newBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <NewBlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const notificationField = () => (
    <div>
      <Notifications.Error message={errorMessage}/>
        <Notifications.Notification message={notificationMessage}/>
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