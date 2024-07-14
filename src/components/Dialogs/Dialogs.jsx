import React from 'react'
import Dialog from './Dialog/Dialog'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = props => {
	let state = props.dialogsPage

	const getDialogs = state.dialogs.map(d => (
		<Dialog key={d.id} id={d.id} name={d.name} />
	))

	const getMessages = state.messages.map(m => (
		<Message key={m.id} id={m.id} message={m.message} />
	))

	const onTextNewMessage = () => {
		props.addMessage()
	}

	const updateNewMessageText = newMessageText => {
		props.updateNewMessage(newMessageText)
	}

	return (
		<div className={classes.Dialogs}>
			<div>{getDialogs}</div>
			<div>
				{getMessages}
				<div>
					<textarea
						onChange={updateNewMessageText}
						value={state.newMessageText}
					></textarea>
					<button onClick={onTextNewMessage}>Enter</button>
				</div>
			</div>
		</div>
	)
}

export default Dialogs
