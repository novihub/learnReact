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
			newMessage: 'text me'
		}
	},
	getState() {
		return this._state
	},
	subscriber(observer) {
		this._callSubscriber = observer
	},
	_callSubscriber(_state) {
		console.log('Rerendered')
	},
	addPost() {
		let newPost = {
			id: this._state.profilePage.posts.length + 1,
			message: this._state.profilePage.newPostText,
			likesCount: 0
		}

		this._state.profilePage.posts.push(newPost)
		this._callSubscriber(this._state)
	},
	updateNewPostText(newPostText) {
		this._state.profilePage.newPostText = newPostText
		this._callSubscriber(this._state)
	},
	addMessage() {
		let newMessage = {
			id: this._state.dialogsPage.messages.length + 1,
			message: this._state.dialogsPage.newMessage
		}

		this._state.dialogsPage.messages.push(newMessage)
		this._callSubscriber(this._state)
	},
	updateNewMessage(newMessage) {
		this._state.dialogsPage.newMessage = newMessage
		this._callSubscriber(this._state)
	}
}

export default store
