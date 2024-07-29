import React, { lazy, startTransition, Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import classes from './App.module.css'
import Preloader from './components/common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import Nav from './components/Nav/Nav'
import { initializeApp } from './redux/app-reducer.ts'

const DialogsContainer = lazy(() =>
	import('./components/Dialogs/DialogsContainer')
)
const ProfileContainer = lazy(() =>
	import('./components/Profile/ProfileContainer')
)
const Login = lazy(() => import('./components/Login/Login'))
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'))
const MusicContainer = lazy(() => import('./components/Music/MusicContainer'))
const SettingsContainer = lazy(() =>
	import('./components/Settings/SettingsContainer')
)

const App = ({ initialized, initializeApp }) => {
	useEffect(() => {
		startTransition(() => {
			initializeApp()
		})
	}, [initializeApp])

	if (!initialized) {
		return <Preloader />
	}

	return (
		<div className={classes.App}>
			<HeaderContainer />
			<Nav />
			<div className={classes.AppContent}>
				<Suspense fallback={<Preloader />}>
					<Routes>
						<Route path='/' element={<Navigate to='login' replace />} />
						<Route path='/profile/:userId' element={<ProfileContainer />} />
						<Route path='/messages/*' element={<DialogsContainer />} />
						<Route path='/users' element={<UsersContainer />} />
						<Route path='/music' element={<MusicContainer />} />
						<Route path='/settings' element={<SettingsContainer />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	initialized: state.app.initialized
})

export default connect(mapStateToProps, {
	initializeApp
})(App)
