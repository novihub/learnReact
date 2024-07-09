import React from 'react'

import {
	addPostActionCreator,
	updateNewPostTextActionCreator
} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'

const MyPostsContainer = props => {
	debugger
	let state = props.store.getState()

	const onAddPost = () => {
		props.store.dispatch(addPostActionCreator())
	}

	const updateNewPostText = newPostText => {
		props.store.dispatch(updateNewPostTextActionCreator(newPostText))
	}

	return (
		<MyPosts
			addPost={onAddPost}
			updateNewPostText={updateNewPostText}
			posts={state.profilePage.posts}
			newPostText={state.profilePage.newPostText}
		/>
	)
}

export default MyPostsContainer
