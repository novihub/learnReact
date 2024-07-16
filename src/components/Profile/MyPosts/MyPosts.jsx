import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Posts/Post'

const MyPosts = props => {
	let getPosts = props.posts.map(p => (
		<Post key={p.id} message={p.message} likesCount={p.likesCount} />
	))

	return (
		<div>
			<div>
				<textarea
					onChange={newPostText => props.updatePostText(newPostText)}
					value={props.newPostText}
				></textarea>
				<button onClick={() => props.addPost()}>Add Post</button>
				<div className={classes.MyPosts}>{getPosts}</div>
			</div>
		</div>
	)
}

export default MyPosts
