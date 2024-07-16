import React from 'react'
import classes from './Post.module.css'

const Post = props => {
	return (
		<div className={classes.Post}>
			<p>{props.message}</p>
			<img
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s'
				alt='IMG'
			/>
			<p>Like {props.likesCount}</p>
		</div>
	)
}

export default Post
