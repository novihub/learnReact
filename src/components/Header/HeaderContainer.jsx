import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/auth-reducer'
import Header from './Header'

class HeaderContainer extends React.Component {
	// componentDidMount() {
	// 	// usersAPI.auth().then(res => {
	// 	// 	if (res.resultCode === 0) {
	// 	// 		let { id, login, email } = res.data
	// 	// 		this.props.setAuthUserData(id, email, login)
	// 	// 		axios
	// 	// 			.get(`https://soc	ial-network.samuraijs.com/api/1.0/profile/${id}`)
	// 	// 			.then(res => {
	// 	// 				this.props.setUserImg(res.photos.small)
	// 	// 			})
	// 	// 	}
	// 	// })
	// 	this.props.setAuthUserData()
	// }

	render() {
		return <Header {...this.props} />
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
		avatar: state.auth.avatar
	}
}

export default connect(mapStateToProps, {
	logout
})(HeaderContainer)
