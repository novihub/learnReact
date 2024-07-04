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
	return (
		<div className={classes.message}>{props.message}</div>
	)
}

const Dialogs = () => {
	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>
				<DialogItem name='Dimych' id='1'/>
				<DialogItem name='Sasha' id='2'/>
				<DialogItem name='Max' id='3'/>
				<DialogItem name='Victor' id='4'/>
				<DialogItem name='Valera' id='5'/>
				<DialogItem name='Alina' id='6'/>
			</div>
			<div className={classes.messages}>
				<Message message='Hi'/>
				<Message message='How are you'/>
				<Message message='Get underground'/>
				<Message message='Thunderbolt'/>
			</div>
		</div>
	)
}

export default Dialogs
