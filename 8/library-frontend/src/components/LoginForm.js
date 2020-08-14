import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({setToken, setError}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) //eslint-disable-line


  const handleLogin = async (event) => {
    event.preventDefault()
    login({ variables: { username, password }})
  }

  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text"
            id='username-field'
            value={username}
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password"
          id='password-field'
          value={password}
          onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm