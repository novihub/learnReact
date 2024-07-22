import React from 'react'
import { Field, reduxForm } from 'redux-form'
import classes from './MyPosts.module.css'
import Post from './Posts/Post'

const MyPosts = props => {
	let getPosts = props.posts.map(p => (
		<Post key={p.id} message={p.message} likesCount={p.likesCount} />
	))

	const onAddPost = values => {
		if (values.newPostText) {
			props.addPost(values.newPostText)
		}
	}

	return (
		<>
			<div className={classes.addPost}>
				<AddNewPostFormRedux onSubmit={onAddPost} />
			</div>
			<div className={classes.MyPosts}>{getPosts}</div>
		</>
	)
}

const AddNewPostForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field component='textarea' name='newPostText' />
			<button>Add Post</button>
		</form>
	)
}

const AddNewPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(
	AddNewPostForm
)

export default MyPosts
