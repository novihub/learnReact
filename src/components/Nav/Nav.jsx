import React from 'react'
import classes from './Nav.module.css'
import { NavLink } from 'react-router-dom'

const getClassName = (({ isActive }) => isActive ? classes.active : '') 

const Nav = () => {
	return (
		<nav className={classes.nav}>
			<ul>
				<li className={`${classes.item} ${classes.active}`}>
					<NavLink to='/profile' className={getClassName}>Profile</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink to='/messages' className={getClassName}>Messages</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink to='/news' className={getClassName}>News</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink to='/music' className={getClassName}>Music</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink to='/settings' className={getClassName}>Settings</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Nav
