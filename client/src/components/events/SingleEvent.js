import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'

import EventContext from '../../context/event/eventContext'
import AuthContext from '../../context/auth/authContext'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'
import EmojiPeople from '@material-ui/icons/EmojiPeople'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const SingleEvent = ({ event }) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated } = authContext

  const eventContext = useContext(EventContext)
  const { deleteEvent, setCurrent, clearCurrent, current } = eventContext

  const [open, setOpen] = React.useState(false)

  const onClickOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const {
    _id,
    firstName,
    lastName,
    email,
    eventDate
  } = event

  const onDelete = () => {
    onClickOpen()
  }

  const onConfirm = () => {
    setOpen(false)
    deleteEvent(_id)
    clearCurrent()
  }

  const isCurrent = _id && current && _id === current._id

  return (
    <>
      <Card style={{
        margin: '22px',
        maxWidth: '400px',
        border: (isCurrent && '2px solid #f50057')
      }}
      >
        <CardContent style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
        >
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <EmojiPeople fontSize='large' />
            </ListItemAvatar>
            <ListItemText
              primary={<>{firstName} {lastName}</>}
              secondary={
                <>
                  <Typography
                    variant='body2'
                    color='textPrimary'
                  >
                    {format(parseISO(eventDate), 'do MMM y (iiii)')}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                  >
                    {email}
                  </Typography>
                </>
              }
            />
          </ListItem>
          {isAuthenticated && (
            <ButtonGroup size='small'>
              <Button variant='contained' color='primary' onClick={() => setCurrent(event)}>
                Edit
              </Button>
              <Button variant='contained' color='secondary' onClick={onDelete}>
                Delete
              </Button>
            </ButtonGroup>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Do you want to delete this event?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            If you remove this event it will no longer appear on events list, also it will be removed from database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} color='secondary' autoFocus>
            Yes delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

SingleEvent.propTypes = {
  event: PropTypes.object.isRequired
}

export default SingleEvent
