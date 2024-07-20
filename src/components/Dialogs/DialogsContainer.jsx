import { connect } from 'react-redux'
import { addMessageAC, updateNewMessageAC } from '../../redux/dialogs-reducer'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
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

export default withAuthRedirect(
	connect(mapStateToProps, mapDispatchToProps)(Dialogs)
)
