import React from 'react'
import { Button } from 'react-bootstrap'

const LogoutButton = (params) => (
  <Button variant="danger" onClick={params.handleLogout} >Logout</Button>
)

export default LogoutButton