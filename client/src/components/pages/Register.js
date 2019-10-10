import React, { useState, useContext, useEffect } from 'react'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const Register = props => {
  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  const authContext = useContext(AuthContext)
  const { register, error, clearErrors, isAuthenticated } = authContext

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
    name: '',
    email: '',
    password: '',
    password2: '',
    submitted: false
  })

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    const { password } = user
    if (value !== password) {
      return false
    }
    return true
  })

  const { name, email, password, password2, submitted } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    register({
      name,
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
        Register new account
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
          label='Name'
          onChange={onChange}
          name='name'
          value={name}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <br />
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
          validators={['required', 'matchRegexp:^(?=.*[a-z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,}$']}
          errorMessages={['this field is required', 'password should have min 8 characters, at least one letter, one number and one special character']}
        />
        <br />
        <TextValidator
          type='password'
          label='Repeat password'
          onChange={onChange}
          name='password2'
          value={password2}
          validators={['isPasswordMatch', 'required']}
          errorMessages={['password mismatch', 'this field is required']}
        />
        <br />
        <br />
        <Button
          color='primary'
          variant='contained'
          type='submit'
          disabled={submitted}
        >
          {
            (submitted && 'Your form is submitted!') || (!submitted && 'Submit')
          }
        </Button>
      </ValidatorForm>
    </Container>
  )
}

export default Register
