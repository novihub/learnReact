import React from 'react'

import classes from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {


	let postsElements = props.posts.map(post => (
		<Post message={post.message} likesCount={post.likesCount} />
	))

	return (
		<div className={classes.postsBlock}>
			<div>
				<textarea name='' id=''></textarea>
				<button>Add post</button>
			</div>
			<div className={classes.posts}>{postsElements}</div>
		</div>
	)
}

export default MyPosts
