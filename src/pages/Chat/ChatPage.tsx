import { Avatar } from 'antd'
import React, {
	FC,
	KeyboardEventHandler,
	useEffect,
	useRef,
	useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	ChatMessageType,
	sendMessage,
	startMessagesListening,
	stopMessagesListening
} from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'
import classes from './ChatPage.module.css'

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
			style={{ minHeight: '740px', maxHeight: '740px', overflowY: 'auto' }}
			onScroll={scrollHandler}
		>
			{messages.map(m => (
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
			<p style={{ fontSize: '1rem' }}>{message.message}</p>
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

	const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = e => {
		if (e.key === 'Enter') {
			e.preventDefault()
			sendMessageHandler()
		}
	}

	return (
		<div className={classes.InputContainer}>
			<textarea
				className={classes.Textarea}
				onChange={e => setMessage(e.currentTarget.value)}
				onKeyDown={handleKeyPress}
				value={message}
			/>
			<button
				className={classes.Input}
				disabled={status !== 'ready'}
				onClick={sendMessageHandler}
			>
				Send
			</button>
		</div>
	)
}

export default ChatPage
