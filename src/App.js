import React from 'react'
import classes from './App.module.css'
import Dialogs from './components/Dialogs/Dialogs'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Profile from './components/Profile/Profile'

import { Route, Routes } from 'react-router-dom'

const App = props => {
	debugger
	return (
		<div className={classes.App}>
			<Header />
			<Nav />
			<div className={classes.AppContent}>
				<Routes>
					<Route
						path='/profile'
						element={
							<Profile
								profilePage={props.state.profilePage}
								dispatch={props.dispatch}
								// addPost={props.addPost}
								// updateNewPostText={props.updateNewPostText}
							/>
						}
					/>
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
