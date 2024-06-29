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
				<Post message='First'/>
				<Post message='Second'/>
				<Post message='Third'/>
				<Post message='Fourth'/>
			</div>
		</>
	)
}

export default MyPosts



