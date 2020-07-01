import React, { useState } from 'react'


const Blog = ({blog, likeBlog, deleteBlog}) => {

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
    console.log("Deleting blog")
    deleteBlog(blog.id)
  }

  if (allInformationVisible){
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
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleViewButton}>view</button>
    </div>    
  )
}

export default Blog
