import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Dialog.module.css'

const Dialog = props => {
	let path = '/messages/' + props.id

	return (
		<div className={classes.Dialog}>
			<NavLink to={path}>{props.name + props.id}</NavLink>
		</div>
	)
}

export default Dialog
