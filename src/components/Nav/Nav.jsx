import React from 'react';
import classes from './Nav.module.css'

import { NavLink } from 'react-router-dom';

const Nav = props => {
	return (
		<nav className={classes.Nav}>
			<ul>
				<li className={classes.NavItem}><NavLink to='/profile'>Profile</NavLink></li>
				<li className={classes.NavItem}><NavLink to='/messages'>Messages</NavLink></li>
				<li className={classes.NavItem}><NavLink to=''>Music</NavLink></li>
				<li className={classes.NavItem}><NavLink to=''>News</NavLink></li>
				<li className={classes.NavItem}><NavLink to=''>Settings</NavLink></li>
			</ul>
		</nav>
	)
}

export default Nav