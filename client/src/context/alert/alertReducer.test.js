import alertReducer from './alertReducer'

describe('Alert Reducer', () => {
  it('should set alert', () => {
    const state = []
    const newState = alertReducer(state, {
      type: 'SET_ALERT',
      payload: { alert: 'test1', id: 1 }
    })
    expect(newState).toEqual([{ alert: 'test1', id: 1 }])
  })
})

it('should remove alert', () => {
  const state = [{ alert: 'test1', id: 1 }, { alert: 'test2', id: 2 }]
  const newState = alertReducer(state, {
    type: 'REMOVE_ALERT',
    payload: 2
  })
  expect(newState).toEqual([{ alert: 'test1', id: 1 }])
})
