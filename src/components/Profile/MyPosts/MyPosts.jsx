import React from 'react'
import classes from './MyPosts.module.css'

import Post from './Post/Post'

const MyPosts = props => {
	const getPosts = props.posts.map(p => (
		<Post id={p.id} message={p.message} likesCount={p.likesCount} />
	))

	const typedTextRef = React.createRef()

	const addPost = () => {
		// props.addPost()
		props.dispatch({ type: 'ADD-POST'})
	}

	const updateNewPostText = () => {
		// props.updateNewPostText(typedTextRef.current.value)
		let newPostText = typedTextRef.current.value
		props.dispatch({ type: 'UPDATE-NEW-POST-TEXT', newPostText: newPostText })
	}

	return (
		<div>
			<div>
				<textarea
					onChange={updateNewPostText}
					ref={typedTextRef}
					value={props.newPostText}
				></textarea>
				<button onClick={addPost}>Add Post</button>
			</div>
			<div className={classes.MyPosts}>{getPosts}</div>
		</div>
	)
}

export default MyPosts
