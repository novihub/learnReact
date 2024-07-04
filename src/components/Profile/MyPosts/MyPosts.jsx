import React from 'react'

import classes from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = () => {
	let posts = [
		{ id: 0, message: 'First', likesCount: 1 },
		{ id: 1, message: 'Second', likesCount: 12 },
		{ id: 2, message: 'Third', likesCount: 123 },
		{ id: 3, message: 'Fourth', likesCount: 1234 }
	]

	let postsElements = posts.map(post => (
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
