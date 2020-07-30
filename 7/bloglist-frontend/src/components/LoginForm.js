import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux';


const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
  event.preventDefault()
    dispatch(login({username, password}))
    setUsername('')
    setPassword('')
}

  return (
    <div>
      <h1>login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text"
            id='username-field'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password"
            id='password-field'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm