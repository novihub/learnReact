import React from 'react'
import { Field, reduxForm } from 'redux-form'
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

	const addNewMessage = values => {
		props.addMessage(values.newMessageBody)
	}

	return (
		<div className={classes.DialogsPage}>
			<div className={classes.Dialogs}>{getDialogs}</div>
			<div className={classes.Messages}>
				<div>{getMessages}</div>
				<div className={classes.addMessage}>
					<AddMessageFormRedux onSubmit={addNewMessage} />
				</div>
			</div>
		</div>
	)
}

const AddMessageForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				component='textarea'
				name='newMessageBody'
				placeholder='Enter your message'
			></Field>
			<button>Enter</button>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(
	AddMessageForm
)

export default Dialogs
