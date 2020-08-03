import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';


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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text"
            id='username-field'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}/>
          <Form.Label>password</Form.Label>
          <Form.Control type="password"
            id='password-field'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}/>
          <Button id='login-button' type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm