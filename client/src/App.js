import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Alert from './components/layout/Alert'

import EventState from './context/event/EventState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'

import Container from '@material-ui/core/Container'
import './App.css'

if (window.localStorage.token) {
  setAuthToken(window.localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <EventState>
        <AlertState>
          <Router>
            <Navbar />
            <Container style={{ marginTop: '100px' }}>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </Container>
          </Router>
        </AlertState>
      </EventState>
    </AuthState>
  )
}

export default App
