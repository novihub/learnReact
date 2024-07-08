import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer'

const store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: 'Post 1', likesCount: '12' },
				{ id: 2, message: 'Post 2', likesCount: '7' },
				{ id: 3, message: 'Post 3', likesCount: '2' },
				{ id: 4, message: 'Post 4', likesCount: '3' },
				{ id: 5, message: 'Post 5', likesCount: '14' }
			],
			newPostText: 'text me'
		},
		dialogsPage: {
			dialogs: [
				{ id: 1, name: 'Maxon' },
				{ id: 2, name: 'Maxon' },
				{ id: 3, name: 'Maxon' },
				{ id: 4, name: 'Maxon' },
				{ id: 5, name: 'Maxon' }
			],
			messages: [
				{ id: 1, message: 'Hi' },
				{ id: 2, message: 'Hello' },
				{ id: 3, message: 'How are you' },
				{ id: 4, message: 'Where are you from' },
				{ id: 5, message: 'Whats up' }
			],
			newMessageText: 'text me'
		},
		sidebar: {}
	},
	getState() {
		return this._state
	},
	_callSubscriber(_state) {
		console.log('Rerendered')
	},
	subscriber(observer) {
		this._callSubscriber = observer
	},

	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action)
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
		this._state.sidebar = sidebarReducer(this._state.sidebar, action)
		this._callSubscriber(this._state)
	}
}

export default store
