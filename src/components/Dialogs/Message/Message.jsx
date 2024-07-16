import React from 'react';
import classes from './Message.module.css'

const Message = props => {

	return (
		<div className={classes.Message}>
			{props.message + ' ' + props.id}
		</div>
	)
}

export default Message