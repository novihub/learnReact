import { Avatar } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	ChatMessageType,
	sendMessage,
	startMessagesListening,
	stopMessagesListening
} from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'

export interface ChatMessageAPIType {
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
	const dispatch = useDispatch()

	const status = useSelector((state: AppStateType) => state.chat.status)

	useEffect(() => {
		dispatch(startMessagesListening())
		return () => {
			dispatch(stopMessagesListening())
		}
	}, [])

	return (
		<div>
			{status === 'error' ? (
				<div>Some error ocurred. Please refresh the page</div>
			) : (
				<>
					<Messages />
					<AddMessageForm />
				</>
			)}
		</div>
	)
}

const Messages: FC = () => {
	const messages = useSelector((state: AppStateType) => state.chat.messages)
	const [isAutoScroll, setIsAutoScrollIs] = useState(true)

	const messagesAnchorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isAutoScroll) {
			messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const elem = e.currentTarget

		if (
			Math.abs(elem.scrollHeight - elem.scrollTop - elem.clientHeight) < 300
		) {
			!isAutoScroll && setIsAutoScrollIs(true)
		} else {
			!isAutoScroll && setIsAutoScrollIs(false)
		}
	}

	return (
		<div
			style={{ height: '800px', overflowY: 'auto' }}
			onScroll={scrollHandler}
		>
			{messages.map((m) => (
				<Message key={m.id} message={m} />
			))}
			<div ref={messagesAnchorRef}></div>
		</div>
	)
}

const Message: FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
	return (
		<div style={{ margin: '10px 10px' }}>
			<Avatar src={message.photo} />
			<b>{message.userName}</b>
			<p>{message.message}</p>
			<br />
		</div>
	)
})

const AddMessageForm: FC = () => {
	const [message, setMessage] = useState('')

	const status = useSelector((state: AppStateType) => state.chat.status)

	const dispatch = useDispatch()
	const sendMessageHandler = () => {
		if (message.trim() !== '') {
			dispatch(sendMessage(message))
			setMessage('')
		}
	}

	return (
		<div>
			<textarea
				onChange={e => setMessage(e.currentTarget.value)}
				value={message}
			/>
			<button disabled={status !== 'ready'} onClick={sendMessageHandler}>
				Send
			</button>
		</div>
	)
}

export default ChatPage
