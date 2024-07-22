import React from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import classes from './App.module.css'
import Preloader from './components/common/Preloader/Preloader'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import MusicContainer from './components/Music/MusicContainer'
import Nav from './components/Nav/Nav'
import ProfileContainer from './components/Profile/ProfileContainer'
import SettingsContainer from './components/Settings/SettingsContainer'
import UsersContainer from './components/Users/UsersContainer'
import { initializeApp } from './redux/app-reducer'
import { setAuthUserData } from './redux/auth-reducer'

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}

		return (
			<div className={classes.App}>
				<HeaderContainer />
				<Nav />
				<div className={classes.AppContent}>
					<Routes>
						<Route path='/profile/:userId?' element={<ProfileContainer />} />
						<Route path='/messages/*' element={<DialogsContainer />} />
						<Route path='/users' element={<UsersContainer />} />
						<Route path='/music' element={<MusicContainer />} />
						<Route path='/settings' element={<SettingsContainer />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		initialized: state.app.initialized
	}
}

export default connect(mapStateToProps, {
	setAuthUserData,
	initializeApp
})(App)
