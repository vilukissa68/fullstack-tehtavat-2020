import React from 'react'
import LogoutButton from './Logout'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavigationMenu = (user) => {

  const dispatch = useDispatch()

  const handleLogout = (event) => {
  console.log('Loggin out')
  event.preventDefault()
  window.localStorage.removeItem('loggedBlogappUser')
  dispatch(setNotification('logged out!', 'notification', 5))
  }

  const padding = {
    paddingRight: 5
  }

  return(
    <Navbar collapseOnSelect expand="lg" bf="light">
      <Navbar.Toggle aria-controls="responsesive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/blogs'>blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/users'>users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user.user.name} logged in <LogoutButton handleLogout={handleLogout}/>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationMenu