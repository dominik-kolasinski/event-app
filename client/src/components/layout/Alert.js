import React, { useContext } from 'react'
import uuid from 'uuid'

import AlertContext from '../../context/alert/alertContext'

import Error from '@material-ui/icons/Error'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const Alert = () => {
  const alertContext = useContext(AlertContext)

  const styledAlertMessage = (alertMsg) => (
    <Container style={{ display: 'flex', alignItems: 'center' }}>
      <Error style={{ marginRight: '22px' }} />
      {alertMsg}
    </Container>
  )

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <Snackbar
        key={uuid.v4()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open
      >
        <SnackbarContent
          message={styledAlertMessage(alert.msg)}
          style={{ backgroundColor: 'red' }}
        />
      </Snackbar>
    ))
  )
}

export default Alert
