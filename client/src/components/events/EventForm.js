import React, { useState, useContext, useEffect } from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import EventContext from '../../context/event/eventContext'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const EventForm = () => {
  const eventContext = useContext(EventContext)
  const { addEvent, updateEvent, clearCurrent, current } = eventContext
  const [eventDate, setEventDate] = React.useState(null)

  const [event, setEvent] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const {
    firstName,
    lastName,
    email
  } = event

  useEffect(() => {
    if (current !== null) {
      setEvent(current)
    } else {
      setEvent({
        firstName: '',
        lastName: '',
        email: ''
      })
      setEventDate(new Date())
    }
  }, [eventContext, current])

  const onChange = e =>
    setEvent({ ...event, [e.target.name]: e.target.value })

  const handleDateChange = date => {
    setEventDate(date)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (current === null) {
      addEvent({ ...event, eventDate })
    } else {
      updateEvent({ ...event, eventDate })
    }
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
  }

  return (
    <Card style={{ margin: '22px', width: '320px', minHeight: '400px', marginTop: '80px' }}>
      <CardContent>
        <Typography color='textSecondary' gutterBottom>
          {current ? 'Edit Event' : 'Add Event'}
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ValidatorForm
            onSubmit={onSubmit}
            style={{
              width: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <TextValidator
              label='First Name'
              onChange={onChange}
              name='firstName'
              value={firstName}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextValidator
              label='Last Name'
              onChange={onChange}
              name='lastName'
              value={lastName}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextValidator
              label='Email'
              onChange={onChange}
              name='email'
              value={email}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            <br />

            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='dd/MM/yyyy'
              margin='normal'
              label='Pick event date'
              value={eventDate}
              onChange={handleDateChange}
            />

            <br />
            <Button
              color='primary'
              variant='contained'
              type='submit'
            >
              {current ? 'Update' : 'Add'}
            </Button>
            <Button
              disabled={!current}
              variant='contained'
              onClick={clearAll}
            >
              Clear
            </Button>
          </ValidatorForm>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  )
}

export default EventForm
