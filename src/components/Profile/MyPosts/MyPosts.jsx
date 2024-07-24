import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLength10, required } from '../../../utils/validators/validators'
import { Textarea } from '../../hoc/createFormsControls'
import classes from './MyPosts.module.css'
import Post from './Posts/Post'

const MyPosts = props => {
	const deletePost = postId => {
		props.deletePost(postId)
	}
	
	let getPosts = props.posts.map(p => (
		<Post
			deletePost={deletePost}
			key={p.id}
			id={p.id}
			message={p.message}
			likesCount={p.likesCount}
		/>
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
			<Field
				placeholder='Post message'
				component={Textarea}
				name='newPostText'
				validate={[required, maxLength10]}
			/>
			<button>Add Post</button>
		</form>
	)
}

const AddNewPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(
	AddNewPostForm
)

export default React.memo(MyPosts)
