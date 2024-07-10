import React from 'react'
import StoreContext from '../../../StoreContext'

import {
	addPostActionCreator,
	updateNewPostTextActionCreator
} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'

const MyPostsContainer = props => {
	return (
		<StoreContext.Consumer>
			{store => {
				let state = store.getState()

				const onAddPost = () => {
					store.dispatch(addPostActionCreator())
				}

				const updateNewPostText = newPostText => {
					store.dispatch(updateNewPostTextActionCreator(newPostText))
				}
				return (
					<MyPosts
						addPost={onAddPost}
						updateNewPostText={updateNewPostText}
						posts={state.profilePage.posts}
						newPostText={state.profilePage.newPostText}
					/>
				)
			}}
		</StoreContext.Consumer>
	)
}

export default MyPostsContainer
