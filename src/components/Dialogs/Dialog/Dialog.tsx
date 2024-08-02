import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Dialog.module.css'

interface OwnPropsType {
	id: number
	name: string
}

const Dialog: React.FC<OwnPropsType> = props => {
	return (
		<div className={classes.Dialog}>
			<NavLink to={`${props.id}`}>{props.name + ' ' + props.id}</NavLink>
		</div>
	)
}

export default Dialog
