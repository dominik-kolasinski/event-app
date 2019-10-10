import eventReducer from './eventReducer'

describe('App', () => {
  describe('Reducer', () => {
    it('should get events', () => {
      const state = { events: ['test'], error: null }
      const newState = eventReducer(state, {
        type: 'GET_EVENTS',
        payload: state.events
      })
      expect(newState).toEqual({ events: ['test'], error: null, loading: false })
    })
  })

  it('should add event', () => {
    const state = { events: [], error: null }
    const newState = eventReducer(state, {
      type: 'ADD_EVENT',
      payload: 'test'
    })
    expect(newState).toEqual({ events: ['test'], error: null, loading: false })
  })

  it('should update event', () => {
    const state = {
      events: [
        { name: 'test1', _id: 1 },
        { name: 'test2', _id: 2 }
      ],
      error: null
    }
    const newState = eventReducer(state, {
      type: 'UPDATE_EVENT',
      payload: { name: 'test1Edited', _id: 1 }
    })
    expect(newState).toEqual({
      events: [
        { name: 'test1Edited', _id: 1 },
        { name: 'test2', _id: 2 }
      ],
      error: null,
      loading: false
    })
  })

  it('should delete event', () => {
    const state = {
      events: [
        { name: 'test1', _id: 1 },
        { name: 'test2', _id: 2 }
      ],
      error: null
    }
    const newState = eventReducer(state, {
      type: 'DELETE_EVENT',
      payload: 1
    })
    expect(newState).toEqual({
      events: [
        { name: 'test2', _id: 2 }
      ],
      error: null,
      loading: false
    })
  })

  it('should clear events', () => {
    const state = {
      current: 'test',
      events: [
        { name: 'test1', _id: 1 },
        { name: 'test2', _id: 2 }
      ],
      error: null,
      loading: false
    }
    const newState = eventReducer(state, {
      type: 'CLEAR_EVENTS'
    })
    expect(newState).toEqual({
      current: null,
      events: null,
      error: null,
      loading: false
    })
  })

  it('should set current', () => {
    const state = {
      current: null
    }
    const newState = eventReducer(state, {
      type: 'SET_CURRENT',
      payload: 'testCurrent'
    })
    expect(newState).toEqual({
      current: 'testCurrent'
    })
  })

  it('should clear current', () => {
    const state = {
      current: 'testCurrent'
    }
    const newState = eventReducer(state, {
      type: 'CLEAR_CURRENT'
    })
    expect(newState).toEqual({
      current: null
    })
  })

  it('should set the error', () => {
    const state = { list: [], error: null }
    const newState = eventReducer(state, {
      type: 'EVENT_ERROR',
      payload: 'error'
    })
    expect(newState.error).toBeTruthy()
  })
})
