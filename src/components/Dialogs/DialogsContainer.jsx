import { connect } from 'react-redux'
import { addMessageAC, updateNewMessageAC } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

const mapStateToProps = state => {
	return {
		dialogsPage: state.dialogsPage
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addMessage: () => {
			dispatch(addMessageAC())
		},
		updateNewMessageText: e => {
			let newMessageText = e.target.value
			dispatch(updateNewMessageAC(newMessageText))
		}
	}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
