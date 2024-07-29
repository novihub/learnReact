import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classes from './Nav.module.css'

const Nav = ({ userId }) => {
	return (
		<div className={classes.Nav}>
			<ul>
				<li className={classes.NavItem}>
					{userId ? (
						<NavLink to={`/profile/${userId}`}>Profile</NavLink>
					) : (
						<NavLink to='/login'>Profile</NavLink>
					)}
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

const mapStateToProps = state => ({
	userId: state.auth.userId
})

export default connect(mapStateToProps, {})(Nav)
