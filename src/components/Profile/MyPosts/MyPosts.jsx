import React from 'react'

import classes from './Post.module.css'


const Post = () => {
	return (
		<>
			<div>
				<textarea name="" id=""></textarea>
				<button>Add post</button>
			</div>
			<div className={classes.posts}>
				<Post />
			</div>
		</>
	)
}

export default Post



