import React from 'react';
import classes from './Message.module.css'

interface OwnPropsType {
	id: number
	message: string
}

const Message: React.FC<OwnPropsType> = props => {

	return (
		<div className={classes.Message}>
			{props.message + ' ' + props.id}
		</div>
	)
}

export default Message