import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer' 
import LogoutButton from '../components/Logout'
import { initializeBlogs } from '../reducers/blogReducer'





const Blog = ({ blog, user, likeBlog, deleteBlog }) => {

  const [allInformationVisible, setAllInformationVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleViewButton = () => {
    if (allInformationVisible){
      setAllInformationVisible(false)
    }
    else{
      setAllInformationVisible(true)
    }
  }

  const handleLike = (event) => {
    console.log(blog.user)
    event.preventDefault()
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    likeBlog(blog.id, blogObject)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const answer = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(answer){
      deleteBlog(blog.id)
    }
  }



  if (allInformationVisible){
    if(user.username === blog.user.username){
      return(
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={handleViewButton}>hide</button>
          <div>url: {blog.url}</div>
          <div>likes: {blog.likes} <button onClick={handleLike}>like</button></div>
          <div>name: {blog.user.name}</div>
          <div><button onClick={handleDelete}>delete</button></div>
        </div>
      )
    }
    return(
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author} <button onClick={handleViewButton}>hide</button>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>name: {blog.user.name}</div>
      </div>
    )
  }
  return(
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button onClick={handleViewButton}>view</button>
    </div>
  )
}

const Blogs = (user) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const blogs = useSelector(state => state.blogs)

  const handleLogout = (event) => {
    console.log('Loggin out')
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification('logged out!', 'notification', 5))
  }
  
  const likeBlog = (id, blogObject) => {
    // blogService.update(id, blogObject)
    //   .then(returnedBlog => {
    //     setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    //   })
    //   dispatch(setNotification('liked <3', 'notification', 5))
  }
  
  const deleteBlog = (id) => {
    // blogService.remove(id)
    //   .then(() => {
    //     setBlogs(blogs.filter(blog => blog.id !== id))
    //     dispatch(setNotification('blog deleted', 'notification', 5))
    //   })
  
    //   .catch(error => {
    //     dispatch(setNotification(`failed to delete blog ${error}`, 'error', 5))
    //   })
  }
  

  return (
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
    )}



export default Blogs
