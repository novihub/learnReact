import React from 'react'
import classes from './Nav.module.css'

const Nav = () => {
	return (
		<nav className={classes.nav}>
			<ul>
				<li>
					<a href='#1'>Profile</a>
				</li>
				<li>
					<a href='#2'>Messages</a>
				</li>
				<li>
					<a href='#3'>News</a>
				</li>
				<li>
					<a href='#4'>Music</a>
				</li>
				<li>
					<a href='#5'>Safari</a>
				</li>
			</ul>
		</nav>
	)
}

export default Nav
