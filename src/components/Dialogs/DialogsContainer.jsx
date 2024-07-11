import React from 'react'
import {
	addMessageActionCreator,
	updateNewMessageActionCreator
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

import { connect } from 'react-redux'

// const DialogsContainer = props => {
// 	return (
// 		<StoreContext.Consumer>
// 			{store => {
// 				const addMessage = () => {
// 					store.dispatch(addMessageActionCreator())
// 				}

// 				const updateNewMessageText = e => {
// 					let newMessageText = e.target.value
// 					store.dispatch(updateNewMessageActionCreator(newMessageText))
// 				}

// 				return (
// 					<Dialogs
// 						addMessage={addMessage}
// 						updateNewMessage={updateNewMessageText}
// 						dialogsPage={store.getState().dialogsPage}
// 					/>
// 				)
// 			}}
// 		</StoreContext.Consumer>
// 	)
// }

let mapStateToProps = state => {
	// data from state
	return {
		dialogsPage: state.dialogsPage
	}
}

let mapDispatchToProps = dispatch => {
	// callbacks
	return {
		addMessage: () => {
			dispatch(addMessageActionCreator())
		},
		updateNewMessage: e => {
			let newMessageText = e.target.value
			dispatch(updateNewMessageActionCreator(newMessageText))
		}
	}
}

const DialogsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dialogs)

export default DialogsContainer
