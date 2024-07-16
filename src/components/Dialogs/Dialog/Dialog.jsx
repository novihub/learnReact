import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Dialog.module.css'

const Dialog = props => {
	return (
		<div className={classes.Dialog}>
			<NavLink to={`${props.id}`}>{props.name + ' ' + props.id}</NavLink>
		</div>
	)
}

export default Dialog
