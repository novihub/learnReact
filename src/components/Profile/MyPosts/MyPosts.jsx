import React from 'react'

import cl from './MyPosts.module.css'

import Post from './post/Post'

const MyPost = () => {
	return (
		<div>
			MyPosts
			<div>
				<textarea name="" id="" cols="30" rows="10"></textarea>
				<button>Add post</button>
				<button>Remove</button>
			</div>
			<div className={cl.posts}>
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</div>
	)
}

export default MyPost