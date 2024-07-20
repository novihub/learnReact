import { Route, Routes } from 'react-router-dom'
import classes from './App.module.css'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import MusicContainer from './components/Music/MusicContainer'
import Nav from './components/Nav/Nav'
import ProfileContainer from './components/Profile/ProfileContainer'
import SettingsContainer from './components/Settings/SettingsContainer'
import UsersContainer from './components/Users/UsersContainer'
import Login from './components/Login/Login'

const App = props => {
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

export default App
