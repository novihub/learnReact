import React from 'react';
import classes from './Nav.module.css'
import { NavLink } from 'react-router-dom';

const Nav = props => {
	return (
		<div className={classes.Nav}>
			<ul>
				<li><NavLink to='/profile'>Profile</NavLink></li>
				<li><NavLink to='/messages'>Messages</NavLink></li>
				<li><NavLink to='/users'>Users</NavLink></li>
				<li><NavLink to='/music'>Music</NavLink></li>
				<li><NavLink to='/settings'>Settings</NavLink></li>
			</ul>
		</div>
	)
}

export default Nav