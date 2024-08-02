import React from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'
import classes from './Nav.module.css'

type PropsFromRedux = ConnectedProps<typeof connector>

const Nav: React.FC<PropsFromRedux> = ({ userId }) => {
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

const mapStateToProps = (state: AppStateType) => ({
	userId: state.auth.userId
})

const connector = connect(mapStateToProps)

export default connector(Nav)
