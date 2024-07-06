// App.js
import React from 'react'
import './App.css'
import Dialogs from './components/Dialogs/Dialogs'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Profile from './components/Profile/Profile'

import { Route, Routes } from 'react-router-dom'

const App = props => {
	return (
		<div className='app-wrapper'>
			<Header />
			<Nav />
			<div className='app-wrapper-content'>
				<Routes>
					<Route
						path='/profile'
						element={
							<Profile
								profilePage={props.state.profilePage}
								addPost={props.addPost}
								updateNewPostText={props.updateNewPostText}
							/>
						}
					/>
					<Route
						path='/messages/*'
						element={
							<Dialogs
								dialogsPage={props.state.dialogsPage}
								addMessage={props.addMessage}
								updateNewMessage={props.updateNewMessage}
							/>
						}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default App
