import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { setAuthUserData, setUserImg } from '../../redux/auth-reducer'
import Header from './Header'

class HeaderContainer extends React.Component {
	componentDidMount() {
		axios
			.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
				withCredentials: true
			})
			.then(res => {
				if (res.data.resultCode === 0) {
					let { id, login, email } = res.data.data
					this.props.setAuthUserData(id, email, login)
					axios
						.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
						.then(res => {
							this.props.setUserImg(res.data.photos.small)
						})
				}
			})
	}

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
	setAuthUserData,
	setUserImg
})(HeaderContainer)
