import React from 'react'
import classes from './Nav.module.css'

import { NavLink } from 'react-router-dom'

const Nav = props => {
	const getClassName = ({ isActive }) => (isActive ? classes.active : '')
	return (
		<nav className={classes.Nav}>
			<ul>
				<li className={classes.NavItem}>
					<NavLink className={getClassName} to='/profile'>
						Profile
					</NavLink>
				</li>
				<li className={classes.NavItem}>
					<NavLink className={getClassName} to='/messages'>
						Messages
					</NavLink>
				</li>
				<li className={classes.NavItem}>
					<NavLink className={getClassName} to='/users'>
						Users
					</NavLink>
				</li>
				<li className={classes.NavItem}>
					<NavLink className={getClassName} to='/music'>
						Music
					</NavLink>
				</li>
				<li className={classes.NavItem}>
					<NavLink className={getClassName} to=''>
						News
					</NavLink>
				</li>
				<li className={classes.NavItem}>
					<NavLink className={getClassName} to=''>
						Settings
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Nav
