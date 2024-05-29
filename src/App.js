import React from 'react'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Profile from './components/Profile'

const App = () => {
	return (
		<div className='app-wrapper'>
			<Header />
			<Nav />
			<Profile />
			<footer className='footer'></footer>
		</div>
	)
}

export default App