import React from 'react'
import classes from './App.module.css'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Profile from './components/Profile/Profile'

import { Route, Routes } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer'

const App = props => {
	return (
		<div className={classes.App}>
			<Header />
			<Nav />
			<div className={classes.AppContent}>
				<Routes>
					<Route path='/profile' element={<Profile store={props.store} />} />
					<Route
						path='/messages/*'
						element={<DialogsContainer store={props.store} />}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default App
