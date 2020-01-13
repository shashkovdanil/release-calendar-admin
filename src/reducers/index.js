import { combineReducers } from 'redux'
import sessionReducer from './session'
import dbReducer from './db'

const rootReducer = combineReducers({
  session: sessionReducer,
  db: dbReducer,
})

export default rootReducer
