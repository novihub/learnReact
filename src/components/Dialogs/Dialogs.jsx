import React from 'react'

import DialogItem from './DialogItem/DialogsItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = props => {
	let dialogsElements = props.dialogsPage.dialogs.map(dialog => (
		<DialogItem name={dialog.name} id={dialog.id} />
	))

	let messagesElements = props.dialogsPage.messages.map(m => (
		<Message message={m.message} />
	))

	let typedTextRef = React.createRef()

	let addMessage = () => {
		props.addMessage()
	}

	let onMessageChange = () => {
		let myMessage = typedTextRef.current.value
		props.updateNewMessage(myMessage)
	}

	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>{dialogsElements}</div>
			<div className={classes.messages}>{messagesElements}</div>
			<div>
				<textarea
					onChange={onMessageChange}
					ref={typedTextRef}
					value={props.dialogsPage.newMessage}
				/>
				<button onClick={addMessage}>Enter</button>
			</div>
		</div>
	)
}

export default Dialogs
