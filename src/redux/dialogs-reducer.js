const ADD_MESSAGE = 'ADD_MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'

let dialogsPage = {
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
}

let dialogsReducer = (state = dialogsPage, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = {
				id: state.messages.length + 1,
				message: state.newMessageText
			}

			return {
				...state,
				newMessageText: '',
				messages: [...state.messages, newMessage]
			}
		case UPDATE_NEW_MESSAGE_TEXT:
			return {...state, newMessageText: action.newMessageText}
		default:
			return state
	}
}

export const addMessageAC = () => ({
	type: ADD_MESSAGE
})

export const updateNewMessageAC = newMessageText => ({
	type: UPDATE_NEW_MESSAGE_TEXT,
	newMessageText: newMessageText
})

export default dialogsReducer
