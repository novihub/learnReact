import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore
} from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import appReducer from './app-reducer'
import authReducer from './auth-reducer'
import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'

const rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

// Utility types to infer action types from reducers
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T> = T extends {
	[keys: string]: (...args: any[]) => infer U
}
	? U
	: never

const store = createStore(
	rootReducer,
	applyMiddleware(thunk as ThunkMiddleware<AppStateType, AnyAction>)
)

// Exposing store to the window object for debugging
if (process.env.NODE_ENV === 'development') {
	// @ts-ignore
	window.store = store
}

export default store
