import React from 'react'

import classes from './Dialogs.module.css'

import { NavLink } from 'react-router-dom'

const DialogItem = props => {
	let path = '/messages/' + props.id

	return (
		<div className={classes.dialog}>
			<NavLink to={path}>{props.name}</NavLink>
		</div>
	)
}

const Message = props => {
	return <div className={classes.message}>{props.message}</div>
}

const Dialogs = () => {
	let dialogs = [
		{ id: 1, name: 'Dimych' },
		{ id: 2, name: 'Sasha' },
		{ id: 3, name: 'Max' },
		{ id: 4, name: 'Victor' },
		{ id: 1, name: 'Valera' },
		{ id: 5, name: 'Alina' }
	]

	let messages = [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'Hello' },
		{ id: 3, message: 'How are you' },
		{ id: 4, message: 'Where are you from' },
		{ id: 5, message: 'Whats up' },
		{ id: 6, message: 'Bye' }
	]

	let dialogsElements = dialogs.map(dialog => (
		<DialogItem name={dialog.name} id={dialog.id} />
	))

	let messagesElements = messages.map(m => <Message message={m.message} />)

	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>{dialogsElements}</div>
			<div className={classes.messages}>{messagesElements}</div>
		</div>
	)
}

export default Dialogs
