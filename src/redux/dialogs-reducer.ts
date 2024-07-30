const ADD_MESSAGE = 'ADD_MESSAGE'

type dialogType = {
	id: number
	name: string
}

type messageType = {
	id: number
	message: string
}

let dialogsPage = {
	dialogs: [
		{ id: 1, name: 'Maxon' },
		{ id: 2, name: 'Maxon' },
		{ id: 3, name: 'Maxon' },
		{ id: 4, name: 'Maxon' },
		{ id: 5, name: 'Maxon' }
	] as Array<dialogType>,
	messages: [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'Hello' },
		{ id: 3, message: 'How are you' },
		{ id: 4, message: 'Where are you from' },
		{ id: 5, message: 'Whats up' }
	] as Array<messageType>
}

export type initialStateType = typeof dialogsPage

let dialogsReducer = (state = dialogsPage, action: any): initialStateType => {
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

type addMessageACActionType = {
	type: typeof ADD_MESSAGE
	newMessageBody: string
}

export const addMessageAC = (newMessageBody: string): addMessageACActionType => ({
	type: ADD_MESSAGE,
	newMessageBody
})

export default dialogsReducer
