let store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 0, message: 'First', likesCount: 1 },
				{ id: 1, message: 'Second', likesCount: 12 },
				{ id: 2, message: 'Third', likesCount: 123 },
				{ id: 3, message: 'Fourth', likesCount: 1234 }
			],
			newPostText: 'maxon'
		},
		dialogsPage: {
			dialogs: [
				{ id: 1, name: 'Dimych' },
				{ id: 2, name: 'Sasha' },
				{ id: 3, name: 'Max' },
				{ id: 4, name: 'Victor' },
				{ id: 1, name: 'Valera' },
				{ id: 5, name: 'Alina' }
			],
			messages: [
				{ id: 1, message: 'Hi' },
				{ id: 2, message: 'Hello' },
				{ id: 3, message: 'How are you' },
				{ id: 4, message: 'Where are you from' },
				{ id: 5, message: 'Whats up' },
				{ id: 6, message: 'Bye' }
			],
			newMessage: 'type something'
		}
	},
	getState() {
		return this._state
	},
	_callSubscriber(_state) {
		console.log('state was changed')
	},
	addPost() {
		let newPost = {
			id: 5,
			message: this._state.profilePage.newPostText,
			likesCount: 0
		}

		this._state.profilePage.posts.push(newPost)
		this._state.profilePage.newPostText = ''
		this._callSubscriber(this._state)
	},
	addMessage() {
		let newMessage = {
			id: 7,
			message: this._state.dialogsPage.newMessage
		}
	
		this._state.dialogsPage.messages.push(newMessage)
		this._state.dialogsPage.newMessage = ''
		this._callSubscriber(this._state)
	},
	updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText
		this._callSubscriber(this._state)
	},
	updateNewMessage(newMessage) {
		this._state.dialogsPage.newMessage = newMessage
		this._callSubscriber(this._state)
	},
	subscribe(observer) {
		this._callSubscriber = observer // Pattern (observer)
	}
}

window._store = store
export default store
