import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore
} from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import appReducer from './app-reducer.ts'
import authReducer from './auth-reducer.ts'
import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

window.store = store

export default store
