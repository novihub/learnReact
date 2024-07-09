import React from 'react'
import {
	addMessageActionCreator,
	updateNewMessageActionCreator
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

const DialogsContainer = props => {
	let state = props.store.getState().dialogsPage

	const addMessage = () => {
		props.store.dispatch(addMessageActionCreator())
	}

	const updateNewMessageText = e => {
		let newMessageText = e.target.value
		props.store.dispatch(updateNewMessageActionCreator(newMessageText))
	}

	return (
		<Dialogs
			addMessage={addMessage}
			updateNewMessage={updateNewMessageText}
			dialogsPage={state}
		/>
	)
}

export default DialogsContainer
