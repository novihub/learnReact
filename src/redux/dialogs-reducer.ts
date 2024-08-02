import { InferActionsTypes } from './redux-store'

type dialogType = {
	id: number
	name: string
}

type messageType = {
	id: number
	message: string
}

export type initialStateType = typeof dialogsPage

type ActionsType = InferActionsTypes<typeof actions>

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

let dialogsReducer = (
	state = dialogsPage,
	action: ActionsType
): initialStateType => {
	switch (action.type) {
		case 'dialogs-page/ADD_MESSAGE':
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

export const actions = {
	addMessage: (newMessageBody: string) =>
		({
			type: 'dialogs-page/ADD_MESSAGE',
			newMessageBody
		}) as const
}

export default dialogsReducer
