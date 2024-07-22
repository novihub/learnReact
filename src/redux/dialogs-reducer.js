const ADD_MESSAGE = 'ADD_MESSAGE'

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
	]
}

let dialogsReducer = (state = dialogsPage, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = {
				id: state.messages.length + 1,
				message: action.newMessageBody
			}

			return {
				...state,
				messages: [...state.messages, newMessage]
			}

		default:
			return state
	}
}

export const addMessageAC = newMessageBody => ({
	type: ADD_MESSAGE,
	newMessageBody
})

export default dialogsReducer
