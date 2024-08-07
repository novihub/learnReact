import { Dispatch } from 'redux'
import { chatApi, StatusType } from '../api/chat-api'
import { ChatMessageAPIType } from '../pages/Chat/ChatPage'
import { InferActionsTypes } from './redux-store'

export type ChatMessageType = ChatMessageAPIType & {
	id: string
}

const initialState: initialStateType = {
	messages: [],
	status: 'pending'
}

type initialStateType = {
	messages: ChatMessageType[]
	status: StatusType
}

type ActionsType = InferActionsTypes<typeof actions>

const chatReducer = (
	state = initialState,
	action: ActionsType
): initialStateType => {
	switch (action.type) {
		case 'chat/RECEIVED_MESSAGES':
			return {
				...state,
				messages: [
					...state.messages,
					...action.payload.messages.map(m => ({
						...m,
						id: Math.random().toString(36).substr(2, 9)
					}))
				]
			}
		case 'chat/CHANGED_STATUS':
			return {
				...state,
				status: action.payload.status
			}
		default:
			return state
	}
}

const actions = {
	receivedMessages: (messages: ChatMessageType[]) =>
		({
			type: 'chat/RECEIVED_MESSAGES',
			payload: { messages }
		}) as const,
	changedStatus: (status: StatusType) =>
		({
			type: 'chat/CHANGED_STATUS',
			payload: { status }
		}) as const
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = messages => {
			dispatch(actions.receivedMessages(messages))
		}
	}

	return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
	if (_statusChangedHandler === null) {
		_statusChangedHandler = status => {
			dispatch(actions.changedStatus(status))
		}
	}

	return _statusChangedHandler
}

export const startMessagesListening = () => async (dispatch: Dispatch) => {
	chatApi.start()
	chatApi.subscribe('messageReceived', newMessageHandlerCreator(dispatch))
	chatApi.subscribe('statusChanged', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = () => async (dispatch: Dispatch) => {
	chatApi.unsubscribe('messageReceived', newMessageHandlerCreator(dispatch))
	chatApi.unsubscribe('statusChanged', statusChangedHandlerCreator(dispatch))
	chatApi.stop()
}

export const sendMessage = (message: string) => async (dispatch: Dispatch) => {
	chatApi.sendMessage(message)
}

export default chatReducer
