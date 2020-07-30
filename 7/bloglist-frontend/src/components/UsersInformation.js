import React, { useEffect } from 'react'
import userService from '../services/users'
import { useState } from 'react'

const User = (user) => {
  return(
    <tr>
      <td>{user.user.name}</td>
      <td>{user.user.blogs.length}</td>
    </tr>
  )
}

const UsersInformation = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const foundUsers = await userService.getAll()
      setUsers(foundUsers)
    }
    fetchUsers()
  }, [])

  return(
    <>
      <h2>Users</h2>
      <div>
        <table className='userInformationTable'>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {users.map(user =>
            <User key={user.id} user={user}/>)}
        </table>
      </div>
    </>
  )
}

export default UsersInformation