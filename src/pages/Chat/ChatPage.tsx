import { Avatar } from 'antd'
import React, { FC, useEffect, useState } from 'react'

export interface ChatType {
	message: string
	photo: string
	userId: number
	userName: string
}

const ChatPage: FC = () => {
	return (
		<div>
			<Chat />
		</div>
	)
}

const Chat: FC = () => {
	const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
	useEffect(() => {
		let ws: WebSocket
		const closeHandler = () => {
			console.log('close ws')
			setTimeout(createChannel, 3000)
		}

		function createChannel() {
			ws?.removeEventListener('close', closeHandler)
			ws?.close()
			ws = new WebSocket(
				'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
			)
			ws?.addEventListener('close', closeHandler)
			setWsChannel(ws)
		}
		createChannel()

		return () => {
			ws?.removeEventListener('close', closeHandler)
			ws?.close()
		}
	}, [])

	return (
		<div>
			<Messages wsChannel={wsChannel} />
			<AddMessageForm wsChannel={wsChannel} />
		</div>
	)
}

const Messages: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
	const [messages, setMessages] = useState<ChatType[]>([])

	useEffect(() => {
		const messageHandler = (e: MessageEvent) => {
			debugger
			let newMessage = JSON.parse(e.data)
			setMessages(prevMessages => [...prevMessages, ...newMessage])
		}

		wsChannel?.addEventListener('message', messageHandler)

		return () => {
			wsChannel?.removeEventListener('message', messageHandler)
		}
	}, [wsChannel])

	return (
		<div style={{ height: '800px', overflowY: 'auto' }}>
			{messages.map((m, i) => (
				<Message key={i} message={m} />
			))}
		</div>
	)
}

const Message: FC<{ message: ChatType }> = ({ message }) => {
	return (
		<div style={{ margin: '10px 10px' }}>
			<Avatar src={message.photo} />
			<b>{message.userName}</b>
			<p>{message.message}</p>
			<br />
		</div>
	)
}

const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
	const [message, setMessage] = useState('')
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		let openHandler = () => {
			console.log('ready')
			setIsReady(true)
		}
		wsChannel?.addEventListener('open', openHandler)
		return () => {
			wsChannel?.removeEventListener('open', openHandler)
		}
	}, [wsChannel])

	const sendMessage = () => {
		if (message.trim() !== '') {
			wsChannel?.send(message)
			setMessage('')
		}
	}

	return (
		<div>
			<textarea
				onChange={e => setMessage(e.currentTarget.value)}
				value={message}
			/>
			<button disabled={wsChannel !== null && !isReady} onClick={sendMessage}>
				Send
			</button>
		</div>
	)
}

export default ChatPage
