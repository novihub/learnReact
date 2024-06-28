import React from 'react'
import cl from './Post.module.css'

const Post = () => {
	return (
		<div className={cl.item}>
			<img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw0h5I44Sc6mT85kNw-OX_7r&ust=1719694822969000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNiGvsmY_4YDFQAAAAAdAAAAABAE" alt="" />
			<p>Post 1</p>

			<span>Like</span>
			<span>Dislike</span>
		</div>
	)
}

export default Post