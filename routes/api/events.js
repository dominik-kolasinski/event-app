const express = require('express')
const { check, validationResult } = require('express-validator/check')

const auth = require('../../middleware/auth')
const Event = require('../../models/Event')

const router = express.Router()

// @route GET api/events
// @desc get all events
// @access Public
router.get(
  '/',
  async (req, res) => {
    try {
      const events = await Event.find().sort({ date: -1 })
      res.json(events)
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ message: 'Server error!' })
    }
  }
)

// @route POST api/events
// @desc add new event
// @access Private
router.post(
  '/',
  [
    [
      check('firstName', 'First name is required').not().isEmpty(),
      check('lastName', 'Last name is required').not().isEmpty(),
      check('email', 'Proper email address is required').isEmail(),
      check('eventDate', 'Proper date is required').isISO8601()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      firstName,
      lastName,
      email,
      eventDate
    } = req.body

    try {
      const newEvent = new Event(
        {
          firstName,
          lastName,
          email,
          eventDate
        }
      )

      const event = await newEvent.save()
      res.json(event)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ message: 'Server error!' })
    }

    res.send('add new event')
  }
)

// @route PUT api/events/:id
// @desc update event
// @access Private
router.put(
  '/:id',
  auth,
  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      eventDate
    } = req.body

    const eventFields = {}
    if (firstName) eventFields.firstName = firstName
    if (lastName) eventFields.lastName = lastName
    if (email) eventFields.email = email
    if (eventDate) eventFields.eventDate = eventDate

    try {
      let event = await Event.findById(req.params.id)

      if (!event) return res.status(404).json({ message: 'Event not found!' })

      event = await Event.findByIdAndUpdate(
        req.params.id,
        { $set: eventFields },
        { new: true }
      )

      res.json(event)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ message: 'Server error!' })
    }

    res.send('update event')
  }
)

// @route DELETE api/events/:id
// @desc delete event
// @access Private
router.delete(
  '/:id',
  auth,
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.id)

      if (!event) return res.status(404).json({ message: 'Event not found!' })

      await Event.findByIdAndRemove(req.params.id)

      res.json({ message: 'Event sucessfully deleted!' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ message: 'Server error!' })
    }
  }
)

module.exports = router
