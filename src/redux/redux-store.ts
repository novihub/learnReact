import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore
} from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import appReducer from './app-reducer.js'
import authReducer from './auth-reducer.js'
import dialogsReducer from './dialogs-reducer.js'
import profileReducer from './profile-reducer.js'
import usersReducer from './users-reducer.js'

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
})

type ReducersType = typeof reducers
export type AppStateType = ReturnType<ReducersType>


let store = createStore(reducers, applyMiddleware(thunk))

// @ts-ignore
window.store = store

export default store
