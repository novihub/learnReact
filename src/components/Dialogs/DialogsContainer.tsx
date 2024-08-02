import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions } from '../../redux/dialogs-reducer'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import Dialogs from './Dialogs'
import { AppStateType } from '../../redux/redux-store'

const mapStateToProps = (state: AppStateType) => {
	return {
		dialogsPage: state.dialogsPage
	}
}

// const mapDispatchToProps = dispatch => {
// 	return {
// 		addMessage: newMessageBody => {
// 			dispatch(actions.addMessageAC(newMessageBody))
// 		}
// 	}
// }

export default compose<React.ComponentType>(
	connect(mapStateToProps, {...actions}),
	withAuthRedirect
)(Dialogs)
