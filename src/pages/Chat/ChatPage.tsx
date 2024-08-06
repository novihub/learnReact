import { Avatar } from 'antd'
import React, { FC, useEffect, useState } from 'react'

const ws = new WebSocket(
	'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
)

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
	return (
		<div>
			<Messages />
			<AddMessageForm />
		</div>
	)
}

const Messages: FC = () => {
	const [messages, setMessages] = useState<ChatType[]>([])

	useEffect(() => {
		ws.addEventListener('message', e => {
			let newMessage = JSON.parse(e.data)
			setMessages(prevMessages => [...prevMessages, ...newMessage])
		})
	}, [])

	return (
		<div style={{ height: '800px', overflowY: 'auto' }}>
			{messages.map((m, i) => (
				<Message key={i} message={m} />
			))}
		</div>
	)
}

const Message: FC<{message: ChatType}> = ({ message }) => {
	return (
		<div style={{ margin: '10px 10px' }}>
			<Avatar src={message.photo} />
			<b>{message.userName}</b>
			<p>{message.message}</p>
			<br />
		</div>
	)
}

const AddMessageForm: FC = () => {
	const [message, setMessage] = useState('')

	const sendMessage = () => {
		if (!message) return

		ws.send(message)
		setMessage('')
	}

	return (
		<div>
			<textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
			<button onClick={sendMessage}>Send</button>
		</div>
	)
}

export default ChatPage
