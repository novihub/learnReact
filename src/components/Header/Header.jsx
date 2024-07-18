import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'

const Header = props => {
	debugger

	return (
		<div className={classes.Header}>
			<div className={classes.loginBlock}>
				{props.avatar ? (<img src={props.avatar} />) : 'my avatar'}
				{props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
			</div>
		</div>
	)
}

export default Header
