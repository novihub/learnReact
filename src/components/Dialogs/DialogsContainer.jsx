import React from 'react'
import {
	addMessageActionCreator,
	updateNewMessageActionCreator
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

import StoreContext from '../../StoreContext'

const DialogsContainer = props => {
	return (
		<StoreContext.Consumer>
			{store => {
				let state = store.getState().dialogsPage

				const addMessage = () => {
					store.dispatch(addMessageActionCreator())
				}

				const updateNewMessageText = e => {
					let newMessageText = e.target.value
					store.dispatch(updateNewMessageActionCreator(newMessageText))
				}

				return (
					<Dialogs
						addMessage={addMessage}
						updateNewMessage={updateNewMessageText}
						dialogsPage={state}
					/>
				)
			}}
		</StoreContext.Consumer>
	)
}

export default DialogsContainer
