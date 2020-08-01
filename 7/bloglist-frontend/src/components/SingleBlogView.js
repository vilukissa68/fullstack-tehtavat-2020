import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addVote, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'



const SingleBlogView = () => {

  const handleLikes = (event) => {
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
      history.push('/')
    }
  }


  const id = useParams().id
  const history = useHistory()

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  const blog = blogs.find(blog => blog.id === id)

  
  console.log(blog)
  if (!blog){
    return null
  }
  return(
    <div>
      <h1>{blog.title}</h1>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={handleLikes}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div><button onClick={handleDelete}>delete</button></div>
    </div>
  )
}

export default SingleBlogView