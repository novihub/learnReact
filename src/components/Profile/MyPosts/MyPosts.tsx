import { default as React } from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { PostType } from '../../../types/types'
import { maxLength10, required } from '../../../utils/validators/validators'
import { Textarea } from '../../hoc/FormsControls/createFormsControls'
import classes from './MyPosts.module.css'
import Post from './Posts/Post'

type MyPostsProps = {
	posts: PostType[]
	addPost: (newPostText: string) => void
	deletePost: (postId: number) => void
	isOwner: boolean
}

type AddNewPostFormValues = {
	newPostText: string
}

type AddNewPostFormProps = InjectedFormProps<AddNewPostFormValues>

const AddNewPostForm: React.FC<AddNewPostFormProps> = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				placeholder='Post message'
				component={Textarea}
				name='newPostText'
				validate={[required, maxLength10]}
			/>
			<button type='submit'>Add Post</button>
		</form>
	)
}

const AddNewPostFormRedux = reduxForm<AddNewPostFormValues>({
	form: 'ProfileAddNewPostForm'
})(AddNewPostForm)

const MyPosts: React.FC<MyPostsProps> = props => {
	const deletePost = (postId: number) => {
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

	const onAddPost = (values: AddNewPostFormValues) => {
		if (values.newPostText) {
			props.addPost(values.newPostText)
		}
	}

	return (
		<>
			<div className={classes.addPost}>
				{props.isOwner && <AddNewPostFormRedux onSubmit={onAddPost} />}
			</div>
			<div className={classes.MyPosts}>{getPosts}</div>
		</>
	)
}

export default React.memo(MyPosts)
