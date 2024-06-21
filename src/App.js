import React from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Nav from './components/Nav'
import Profile from './components/Profile'

const App = () => {
	return (
		<div className='app-wrapper'>
			<Header />
			<Nav />
			<Profile />
			<Footer />
		</div>
	)
}

export default App
