import { combineReducers, legacy_createStore as createStore } from 'redux'
import dialogsReducer from './dialogs-reducer'
import MusicReducer from './music-reducer'
import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	musicPage: MusicReducer
})

let store = createStore(reducers)

window.store = store

export default store
