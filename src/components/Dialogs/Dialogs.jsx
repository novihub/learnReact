import React from 'react'
import Dialog from './Dialog/Dialog'
import classes from './Dialogs.module.css'
import Message from './Message/Message'
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../redux/dialogs-reducer'

const Dialogs = props => {
	const getDialogs = props.dialogsPage.dialogs.map(d => (
		<Dialog id={d.id} name={d.name} />
	))

	const getMessages = props.dialogsPage.messages.map(m => (
		<Message id={m.id} message={m.message} />
	))

	const addMessage = () => {
		// props.addMessage()
		props.dispatch(addMessageActionCreator())
	}


	const updateNewMessageText = (e) => {
		let newMessageText = e.target.value
		props.dispatch(updateNewMessageActionCreator(newMessageText))
		// props.updateNewMessage(typedTextRef.current.value)
	}

	return (
		<div className={classes.Dialogs}>
			<div>{getDialogs}</div>
			<div>
				{getMessages}
				<div>
					<textarea
						onChange={updateNewMessageText}
						value={props.dialogsPage.newMessageText}
					></textarea>
					<button onClick={addMessage}>Enter</button>
				</div>
			</div>
		</div>
	)
}

export default Dialogs
