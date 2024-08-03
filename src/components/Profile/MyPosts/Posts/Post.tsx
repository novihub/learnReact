import React from 'react'
import classes from './Post.module.css'

type PostProps = {
	id: number
	message: string
	likesCount: number
	deletePost: (postId: number) => void
}

const Post: React.FC<PostProps> = props => {
	return (
		<div className={classes.Post}>
			<p>{props.message}</p>
			<img
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s'
				alt='Post'
			/>
			<p>Like {props.likesCount}</p>
			<button onClick={() => props.deletePost(props.id)}>
				Delete this post
			</button>
		</div>
	)
}

export default Post
