import React from 'react'
import Dialog from './Dialog/Dialog'
import classes from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = props => {
	const getDialogs = props.dialogsPage.dialogs.map(d => (
		<Dialog id={d.id} name={d.name} />
	))

	const getMessages = props.dialogsPage.messages.map(m => (
		<Message id={m.id} message={m.message} />
	))

	const addMessage = () => {
		props.addMessage()
	}

	const typedTextRef = React.createRef()

	const updateNewMessage = () => {
		props.updateNewMessage(typedTextRef.current.value)
	}


	return (
		<div className={classes.Dialogs}>
			<div>{getDialogs}</div>
			<div>{getMessages}</div>
			<div>
				<textarea onChange={updateNewMessage} ref={typedTextRef} value={props.dialogsPage.newMessage}></textarea>
				<button onClick={addMessage}></button>
			</div>
		</div>
	)
}

export default Dialogs
