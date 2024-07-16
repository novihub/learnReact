import { Route, Routes } from 'react-router-dom'
import classes from './App.module.css'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import Header from './components/Header/Header'
import Music from './components/Music/Music'
import Nav from './components/Nav/Nav'
import ProfileContainer from './components/Profile/ProfileContainer'
import Settings from './components/Settings/Settings'
import UsersContainer from './components/Users/UsersContainer'

const App = props => {
	return (
		<div className={classes.App}>
			<Header />
			<Nav />
			<div className={classes.AppContent}>
				<Routes>
					<Route path='/profile/*' element={<ProfileContainer />} />
					<Route path='/messages/*' element={<DialogsContainer />} />
					<Route path='/users' element={<UsersContainer />} />
					<Route path='/Music' element={<Music />} />
					<Route path='/Settings' element={<Settings />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
