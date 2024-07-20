import { connect } from 'react-redux'
import { addMessageAC, updateNewMessageAC } from '../../redux/dialogs-reducer'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import Dialogs from './Dialogs'

const mapStateToProps = state => {
	return {
		dialogsPage: state.dialogsPage,
		isAuth: state.auth.isAuth
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

const authRedirectComponent = withAuthRedirect(Dialogs)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(authRedirectComponent)
