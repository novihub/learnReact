import React from 'react'
import Dialog from './Dialog/Dialog'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = props => {
	const getDialogs = props.dialogsPage.dialogs.map(d => (
		<Dialog key={d.id} name={d.name} id={d.id} />
	))

	const getMessages = props.dialogsPage.messages.map(m => (
		<Message key={m.id} message={m.message} id={m.id} />
	))

	return (
		<div className={classes.DialogsPage}>
			<div className={classes.Dialogs}>{getDialogs}</div>
			<div className={classes.Messages}>
				<div>{getMessages}</div>
				<div className={classes.addMessage}>
					<textarea
						onChange={newMessageText =>
							props.updateNewMessageText(newMessageText)
						}
						value={props.dialogsPage.newMessageText}
					></textarea>
					<button onClick={() => props.addMessage()}>Enter</button>
				</div>
			</div>
		</div>
	)
}

export default Dialogs
