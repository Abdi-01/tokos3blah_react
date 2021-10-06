import { combineReducers } from 'redux'
import { authReducer } from './loginReducer'
import { albumReducer } from './albumReducer'

export const Reducers = combineReducers({
    authReducer,
    albumReducer
})