import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users' 


const SingleUserView = () => {
  const [user, setUser] = useState(null)
  const id = useParams().id
  
  useEffect(() => {
    const fetchUser = async () => {
      const foundUser = await userService.getById(id)
      setUser(foundUser)
    }
    fetchUser()
  }, [id])
  
  if (!user) {
    return null
  }
  return(
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
      {user.blogs.map(blog => {
        return <li key={blog.id}> {blog.title}</li>
      })}
      </ul>
    </div>
  )
}

export default SingleUserView