import React from 'react'
import classes from './App.module.css'
import Dialogs from './components/Dialogs/Dialogs'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Profile from './components/Profile/Profile'

import { Route, Routes } from 'react-router-dom'

const App = props => {
	return (
		<div className={classes.App}>
			<Header />
			<Nav />
			<div className={classes.AppContent}>
				<Routes>
					<Route path='/profile' element={<Profile store={props.store}/>} />
					<Route
						path='/messages/*'
						element={
							<Dialogs
								dialogsPage={props.state.dialogsPage}
								dispatch={props.dispatch}
								// addMessage={props.addMessage}
								// updateNewMessage={props.updateNewMessage}
							/>
						}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default App
