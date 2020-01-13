import { LOG_IN, LOG_OUT } from '../actions/session'

const INITIAL_STATE = null

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOG_IN: {
      return action.payload
    }
    case LOG_OUT: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}

export default sessionReducer
