import React from 'react'

import classes from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = () => {
	return (
		<>
			<div>
				<textarea name="" id=""></textarea>
				<button>Add post</button>
			</div>
			<div className={classes.posts}>
				<Post message='First' likesCount='0'/>
				<Post message='Second' likesCount='23'/>
				<Post message='Third'/>
				<Post message='Fourth'/>
			</div>
		</>
	)
}

export default MyPosts



