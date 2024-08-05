import React, { Suspense, lazy, startTransition, useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import classes from './App.module.css'
import HeaderContainer from './components/Header/HeaderContainer'
import Nav from './components/Nav/Nav'
import Preloader from './components/common/Preloader/Preloader'
import { initializeApp } from './redux/app-reducer'
import { AppStateType } from './redux/redux-store'

interface OwnPropsType {
	logout: () => Promise<void>
	avatar: string | null
	isAuth: boolean
	login: string | null
}

const DialogsContainer = lazy(
	() => import('./components/Dialogs/DialogsContainer')
)
const ProfileContainer = lazy(
	() => import('./components/Profile/ProfileContainer')
)
const Login = lazy(() => import('./components/Login/Login'))
const UsersPage = lazy(() => import('./components/Users/UsersPage'))
const MusicContainer = lazy(() => import('./components/Music/MusicContainer'))
const SettingsContainer = lazy(
	() => import('./components/Settings/SettingsContainer')
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnPropsType

const App: React.FC<Props> = ({ initialized, initializeApp }) => {
	// const navigate = useNavigate()

	// useEffect(() => {
	// 	startTransition(() => {
	// 		initializeApp()
	// 	})
	// }, [initializeApp])

	// useEffect(() => {
	// 	if (!initialized) {
	// 		navigate('/login', { replace: true })
	// 	}
	// }, [initialized, navigate])

	// if (!initialized) {
	// 	return <Preloader />
	// }

	return (
		<div className={classes.App}>
			<HeaderContainer />
			<Nav />
			<div className={classes.AppContent}>
				<Suspense fallback={<Preloader />}>
					<Routes>
						<Route path='/profile/:userId' element={<ProfileContainer />} />
						<Route path='/messages/*' element={<DialogsContainer />} />
						<Route path='/users' element={<UsersPage />} />
						<Route path='/music' element={<MusicContainer />} />
						<Route path='/settings' element={<SettingsContainer />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized
})

const connector = connect(mapStateToProps, {
	initializeApp
})

export default connector(App)
