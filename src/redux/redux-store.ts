import {
	Action,
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore
} from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk, { ThunkAction, ThunkMiddleware } from 'redux-thunk'
import appReducer from './app-reducer'
import authReducer from './auth-reducer'
import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'
import chatReducer from './chat-reducer'

const rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
	chat: chatReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

// Utility types to infer action types from reducers
export type InferActionsTypes<T> = T extends {
	[keys: string]: (...args: any[]) => infer U
}
	? U
	: never

export type BasedThunkType<A extends Action, R = Promise<void>> = ThunkAction<
	R,
	AppStateType,
	unknown,
	A
>

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
