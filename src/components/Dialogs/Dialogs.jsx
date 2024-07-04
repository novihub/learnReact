import React from 'react'

import classes from './Dialogs.module.css'

import { NavLink } from 'react-router-dom'

const Dialogs = props => {
	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogItems}>
				<div className={classes.dialog}>
					<NavLink to='/messages/1'>First</NavLink>
				</div>
				<div className={classes.dialog}>
					<NavLink to='/messages/2'>Second</NavLink>
				</div>
				<div className={classes.dialog}>
					<NavLink to='/messages/3'>Third</NavLink>
				</div>
				<div className={classes.dialog}>
					<NavLink to='/messages/4'>Fourth</NavLink>
				</div>
				<div className={classes.dialog}>
					<NavLink to='/messages/5'>Fifth</NavLink>
				</div>
			</div>
			<div className={classes.messages}>
				<div className={classes.message}>Hi</div>
				<div className={classes.message}>Hello</div>
				<div className={classes.message}>How are you</div>
			</div>
		</div>
	)
}

export default Dialogs
