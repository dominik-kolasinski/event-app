import React, { useState, useContext, useEffect } from 'react'

import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const Login = props => {
  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  const authContext = useContext(AuthContext)
  const { login, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error) {
      setAlert(error)
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
    submitted: false
  })

  const { email, password, submitted } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    login({
      email,
      password
    })
  }

  return (
    <Container maxWidth='xs'>
      <h1 style={{
        fontSize: '18px',
        color: '#3f51b5',
        marginTop: '22px',
        marginBottom: '22px'
      }}
      >
          Login in to your account
      </h1>
      <ValidatorForm
        onSubmit={onSubmit}
        style={{
          width: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextValidator
          label='Email'
          onChange={onChange}
          name='email'
          value={email}
          validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
        />
        <br />
        <TextValidator
          type='password'
          label='Password'
          onChange={onChange}
          name='password'
          value={password}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
        <br />
        <Button
          color='primary'
          variant='contained'
          type='submit'
          disabled={submitted}
        >
          Submit
        </Button>
      </ValidatorForm>
    </Container>
  )
}

export default Login
