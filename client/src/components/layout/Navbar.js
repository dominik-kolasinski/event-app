import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/auth/authContext'
import EventContext from '../../context/event/eventContext'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, logout, user } = authContext

  const eventContext = useContext(EventContext)
  const { clearEvents } = eventContext

  const onLogout = () => {
    logout()
    clearEvents()
  }

  const authLinks = (
    <Box style={{ width: 'auto', display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '22px' }}>Hello {user && user.name} </span>
      <a onClick={onLogout} href='/'>
        <Button>
          <span style={{ color: '#fff' }}>
            Logout
          </span>
        </Button>
      </a>
    </Box>
  )

  const guestLinks = (
    <ButtonGroup>
      <Link to='/register'>
        <Button>
          <span style={{ color: '#fff' }}>
            Register
          </span>
        </Button>
      </Link>
      <Link to='/login'>
        <Button>
          <span style={{ color: '#fff' }}>
            Login
          </span>
        </Button>
      </Link>
    </ButtonGroup>
  )

  return (
    <AppBar position='fixed' style={{ zIndex: 1201 }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6'>
          <Link to='/'>
            <span style={{ color: '#fff' }}>
              EventApp
            </span>
          </Link>
        </Typography>
        {isAuthenticated ? authLinks : guestLinks}
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

Navbar.defaultProps = {
  title: 'Event Keeper',
  icon: 'fas fa-id-card-alt'
}

export default Navbar
