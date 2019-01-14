import NavigationReducer from './NavigationReducer'
import FlowersReducer from './FlowersReducer'
import UserAuthReducer from './UserAuthReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    NavigationReducer,
    FlowersReducer,
    UserAuthReducer
})
