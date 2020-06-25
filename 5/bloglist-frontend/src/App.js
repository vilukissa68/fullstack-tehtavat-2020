import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notifications from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import LogoutButton from './components/Logout'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService.create(newBlog)
    .then(returnedBlog =>
      setBlogs(blogs.concat(returnedBlog))
    )
    setNotificationMessage('new blog added!')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
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
      <p>{user.name} logged in<LogoutButton handleLogout={handleLogout}/></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const notificationField = () => (
    <div>
      <Notifications.Error message={errorMessage}/>
        <Notifications.Notification message={notificationMessage}/>
    </div>
  )

  const newBlogForm = () => (
    <div>
      <h2>new note</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title
            <input type="text"
            value={newTitle}
            name='Title'
            onChange={({ target }) => setNewTitle(target.value)}/>
        </div>
         <div>
          author
            <input type="text"
            value={newAuthor}
            name='Author'
            onChange={({ target }) => setNewAuthor(target.value)}/>
        </div>
         <div>
          url
            <input type="text"
            value={newUrl}
            name='Url'
            onChange={({ target }) => setNewUrl(target.value)}/>
        </div>
        <button type="submit">add</button>
      </form>
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

  return (
    <div>
    {notificationField()}
    {noteForm()}
    {newBlogForm()}
    </div>
  )
}
  
export default App