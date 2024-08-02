import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import Header from './Header'

// Define the interface for the props from mapStateToProps
interface MapStatePropsType {
	isAuth: boolean
	login: string | null
	avatar: string | null
}

// Use ConnectedProps to get the types from connect
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
	avatar: state.auth.avatar
})

const mapDispatchToProps = {
	logout
}

// Combine the props from mapStateToProps and mapDispatchToProps
const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type HeaderContainerProps = PropsFromRedux

class HeaderContainer extends React.Component<HeaderContainerProps> {
	// componentDidMount() {
	//   this.props.setAuthUserData();
	// }

	render() {
		const { logout, avatar, isAuth, login } = this.props
		return (
			<Header
				logout={logout}
				avatar={avatar}
				isAuth={isAuth}
				login={login || ''}
			/>
		)
	}
}

export default connector(HeaderContainer)
