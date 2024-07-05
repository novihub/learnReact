import React from 'react'

import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem'
import Message from './Message/Message'

const Dialogs = (props) => {




	let dialogsElements = props.dialogs.map(dialog => (
		<DialogItem name={dialog.name} id={dialog.id} />
	))

	let messagesElements = props.messages.map(m => <Message message={m.message} />)

	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>{dialogsElements}</div>
			<div className={classes.messages}>{messagesElements}</div>
		</div>
	)
}

export default Dialogs
