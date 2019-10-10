const mongoose = require('mongoose')
const EventModel = require('../../models/Event')
const eventData = { firstName: 'testFirstName', lastName: 'testLastName', email: 'test@test.com', eventDate: new Date() }

describe('Event Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  })

  it('create & save event successfully', async () => {
    const validEvent = new EventModel(eventData)
    const savedEvent = await validEvent.save()
    expect(savedEvent._id).toBeDefined()
    expect(savedEvent.firstName).toBe(eventData.firstName)
    expect(savedEvent.lastName).toBe(eventData.lastName)
    expect(savedEvent.email).toBe(eventData.email)
    expect(savedEvent.eventDate).toBe(eventData.eventDate)
  })

  it('insert event successfully, but the field does not defined in schema should be undefined', async () => {
    const eventWithInvalidField = new EventModel({ ...eventData, notInSchemaField: 'test' })
    const savedEventWithInvalidField = await eventWithInvalidField.save()
    expect(savedEventWithInvalidField._id).toBeDefined()
    expect(savedEventWithInvalidField.notInSchemaField).toBeUndefined()
  })

  it('create event without required fields should fail and return validation errors', async () => {
    const eventWithoutRequiredField = new EventModel({ })
    let err
    // eslint-disable-next-line
    let error
    try {
      const savedEventWithoutRequiredField = await eventWithoutRequiredField.save()
      error = savedEventWithoutRequiredField
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.firstName).toBeDefined()
    expect(err.errors.lastName).toBeDefined()
    expect(err.errors.email).toBeDefined()
    expect(err.errors.eventDate).toBeDefined()
  })
})
