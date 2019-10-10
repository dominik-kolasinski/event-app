import React, { useContext, useEffect } from 'react'
import Events from '../events/Events'
import EventForm from '../events/EventForm'
import AuthContext from '../../context/auth/authContext'

import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'

const Home = () => {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    authContext.loadUser()
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Drawer
        variant='permanent'
        anchor='right'
      >
        <EventForm />
      </Drawer>
      <Events />
    </Container>
  )
}

export default Home
