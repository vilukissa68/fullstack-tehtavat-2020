import React, { useEffect } from 'react'
import userService from '../services/users'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const User = (user) => {
  return(
    <tr>
      <td><Link to={`/users/${user.user.id}`}>{user.user.name}</Link></td>
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
          <tbody>
            <tr>
              <th></th>
              <th>Blogs created</th>
            </tr>
            {users.map(user =>
              <User key={user.id} user={user}/>)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UsersInformation