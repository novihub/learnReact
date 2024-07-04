import React from 'react'

import classes from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = () => {
	let postsData = [
		{ id: 0, message: 'First', likesCount: 1 },
		{ id: 1, message: 'Second', likesCount: 12 },
		{ id: 2, message: 'Third', likesCount: 123 },
		{ id: 3, message: 'Fourth', likesCount: 1234 }
	]

	return (
		<div className={classes.postsBlock}>
			<div>
				<textarea name='' id=''></textarea>
				<button>Add post</button>
			</div>
			<div className={classes.posts}>
				<Post message={postsData[0].message} likesCount={postsData[0].likesCount} />
				<Post message={postsData[1].message} likesCount={postsData[1].likesCount} />
				<Post message={postsData[2].message} likesCount={postsData[2].likesCount} />
			</div>
		</div>
	)
}

export default MyPosts
