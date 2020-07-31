import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer' 

import { initializeBlogs, addVote, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {

  const dispatch = useDispatch()
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
    dispatch(addVote(blog))
    dispatch(setNotification('liked <3', 'notification', 5))
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const answer = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(answer){
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification('blog deleted', 'notification', 5))
      } catch(error){
        dispatch(setNotification(`failed to delete blog ${error}`, 'error', 5))
      }
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

  const sortBlogs = () => {
    blogs.sort((a,b) => b.likes - a.likes)
  }


  const blogs = useSelector(state => state.blogs)
  sortBlogs()


  return (
    <div>
      
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          user={user.user}/>
      )}
    </div>
    )}



export default Blogs
