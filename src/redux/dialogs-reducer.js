const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

const dialogsReducer = (state, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = {
				id: state.messages.length + 1,
				message: state.newMessageText
			}
			state.messages.push(newMessage)
			state.newMessageText = ''
			return state
		case UPDATE_NEW_MESSAGE:
			state.newMessageText = action.newMessageText
			return state

		default:
			return state
	}
}

export const addMessageActionCreator = () => ({
	type: ADD_MESSAGE
})

export const updateNewMessageActionCreator = newMessageText => ({
	type: UPDATE_NEW_MESSAGE,
	newMessageText: newMessageText
})

export default dialogsReducer
