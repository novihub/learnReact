import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Nav.module.css'

const Nav = props => {
	return (
		<div className={classes.Nav}>
			<ul>
				<li className={classes.NavItem}>
					<NavLink to='/profile'>Profile</NavLink>
				</li>
				<li className={classes.NavItem}>
					<NavLink to='/messages'>Messages</NavLink>
				</li>
				<li className={classes.NavItem}>
					<NavLink to='/users'>Users</NavLink>
				</li>
				<li className={classes.NavItem}>
					<NavLink to='/music'>Music</NavLink>
				</li>
				<li className={classes.NavItem}>
					<NavLink to='/settings'>Settings</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default Nav
