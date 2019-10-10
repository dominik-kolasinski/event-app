import React, { useContext, useEffect } from 'react'

import EventContext from '../../context/event/eventContext'
import SingleEvent from './SingleEvent'
import Loader from '../layout/Loader'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const Events = () => {
  const eventContext = useContext(EventContext)
  const { events, getEvents, loading } = eventContext

  useEffect(() => {
    getEvents()
    // eslint-disable-next-line
  }, []);

  if (events !== null && events.length === 0 && !loading) {
    return (
      <Container
        maxWidth='sm'
        alignItems='center'
      >
        <Typography style={{ marginTop: '44px' }}>
          There are no events to display
        </Typography>
      </Container>
    )
  }

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {events !== null && !loading ? (
        events.map(event => (
          <SingleEvent event={event} key={event._id} />
        ))
      ) : (
        <Loader />
      )}
    </Container>
  )
}

export default Events
