import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";


const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>
      {blog.title} {blog.author}
      </Link>
    </div>
  )
}

const Blogs = (user) => {

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
