import React from 'react'
import classes from './Post.module.css'

const Post = props => {
	return (
		<div className={classes.Post}>
			<div>{props.message}</div>
			<div>
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s'
					alt='IMG'
				/>
				<div>like {props.likesCount}</div>
			</div>
		</div>
	)
}

export default Post
