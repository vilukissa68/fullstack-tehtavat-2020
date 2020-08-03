import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addVote, deleteBlog, addNewComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { Button } from 'react-bootstrap'

const CommentForm = (props) => {
  const id = props.id
  const commentFormRef = props.commentFormRef
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

const addComment = (event) => {
  event.preventDefault()
  const newComment = {
    message: comment
  }
  dispatch(addNewComment(id, newComment))
  setComment('')
  commentFormRef.current.toggleVisibility()
}

  return(
    <div>
      <form onSubmit={addComment}>
        <div>
          <input type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)}/>
          <button type="submit">send</button>
        </div>
      </form>
    </div>
  )
}

const SingleBlogView = () => {
  const id = useParams().id
  const history = useHistory()

  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)
  const dispatch = useDispatch()
  const commentFormRef = useRef()
  
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

  if (!blog){
    return null
  }

  return(
    <div>
      <h1>{blog.title}</h1>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <Button onClick={handleLikes}>like</Button></div>
      <div>added by {blog.user.name}</div>
      <div><Button variant="danger" onClick={handleDelete}>delete</Button></div>
      <h2>comments</h2>
      <Togglable buttonLabel = {'add comment'} ref={commentFormRef}>
        <CommentForm id={id} commentFormRef={commentFormRef}/>
      </Togglable>
      <ul>
      {blog.comments.map((comment, index) => {
        return <li key={`${id}${index}`}>{comment}</li>
      })}
      </ul>

    </div>
    )
}

export default SingleBlogView