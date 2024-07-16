import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Posts/Post'

const MyPosts = props => {
	let getPosts = props.posts.map(p => (
		<Post key={p.id} message={p.message} likesCount={p.likesCount} />
	))

	return (
		<>
			<div className={classes.addPost}>
				<textarea
					onChange={newPostText => props.updatePostText(newPostText)}
					value={props.newPostText}
				></textarea>
				<button onClick={() => props.addPost()}>Add Post</button>
			</div>
			<div className={classes.MyPosts}>{getPosts}</div>
		</>
	)
}

export default MyPosts
