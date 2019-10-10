import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_EVENT,
  EVENT_ERROR,
  CLEAR_EVENTS
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false
      }
    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
        loading: false
      }
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === action.payload._id ? action.payload : event
        ),
        loading: false
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(
          event => event._id !== action.payload
        ),
        loading: false
      }
    case CLEAR_EVENTS:
      return {
        ...state,
        events: null,
        error: null,
        current: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case EVENT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
