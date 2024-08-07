import { ChatMessageType } from '../redux/chat-reducer'

export type StatusType = 'pending' | 'ready' | 'error'

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

const subscribers = {
	messageReceived: [] as MessagesReceivedSubscriberType[],
	statusChanged: [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null

const closeHandler = () => {
	notifySubscribersAboutStatus('pending')
	setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
	let newMessage = JSON.parse(e.data)
	subscribers['messageReceived'].forEach(s => s(newMessage))
}

const openHandler = () => {
	notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
	notifySubscribersAboutStatus('error')
	console.log('Refresh page')
}

const cleanUp = () => {
	ws?.removeEventListener('close', closeHandler)
	ws?.removeEventListener('message', messageHandler)
	ws?.removeEventListener('open', openHandler)
	ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
	subscribers['statusChanged'].forEach(s => s(status))
}

function createChannel() {
	cleanUp()
	ws?.close()
	ws = new WebSocket(
		'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
	)
	notifySubscribersAboutStatus('pending')
	ws.addEventListener('close', closeHandler)
	ws.addEventListener('message', messageHandler)
	ws.addEventListener('open', openHandler)
	ws.addEventListener('open', openHandler)
}

type EventsNamesType = 'messageReceived' | 'statusChanged'

export const chatApi = {
	start() {
		createChannel()
	},
	stop() {
		subscribers['messageReceived'] = []
		subscribers['statusChanged'] = []
		cleanUp()
		ws?.close()
	},
	subscribe(
		eventName: EventsNamesType,
		callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
	) {
		// @ts-ignore
		subscribers[eventName].push(callback)
		// 2 method
		return () => {
			// @ts-ignore
			subscribers[eventName] = subscribers[eventName].filter(
			// @ts-ignore
				s => s !== callback
			)
		}
	},
	unsubscribe(
		eventName: EventsNamesType,
		callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
	) {
		// @ts-ignore
		subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
	},
	sendMessage(message: string) {
		ws?.send(message)
	}
}
