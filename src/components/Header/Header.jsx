import React from 'react'
import { NavLink } from 'react-router-dom'
import userPNG from '../../assets/user.png'
import userStyle from '../common/User/userPNG.module.css'
import classes from './Header.module.css'

const Header = props => {
	return (
		<div className={classes.Header}>
			<div className={classes.loginBlock}>
				{props.avatar ? (
					<img src={props.avatar} alt='' />
				) : (
					<img className={userStyle.userPNG} src={userPNG} alt='' />
				)}
				{props.isAuth ? props.login : <NavLink to='/login'>Login</NavLink>}
			</div>
		</div>
	)
}

export default Header
