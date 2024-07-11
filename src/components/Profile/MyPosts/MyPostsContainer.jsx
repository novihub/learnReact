import React from 'react'

import {
	addPostActionCreator,
	updateNewPostTextActionCreator
} from '../../../redux/profile-reducer'

import { connect } from 'react-redux'
import MyPosts from './MyPosts'

// const MyPostsContainer = props => {
// 	return (
// 		<StoreContext.Consumer>
// 			{store => {
// 				let state = store.getState()

// 				const onAddPost = () => {
// 					store.dispatch(addPostActionCreator())
// 				}

// 				const updateNewPostText = newPostText => {
// 					store.dispatch(updateNewPostTextActionCreator(newPostText))
// 				}
// 				return (
// 					<MyPosts
// 						addPost={onAddPost}
// 						updateNewPostText={updateNewPostText}
// 						posts={state.profilePage.posts}
// 						newPostText={state.profilePage.newPostText}
// 					/>
// 				)
// 			}}
// 		</StoreContext.Consumer>
// 	)
// }

let mapStateToProps = state => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText
	}
}

let mapDispatchToProps = dispatch => {
	return {
		addPost: () => {
			dispatch(addPostActionCreator())
		},
		updateNewPostText: newPostText => {
			dispatch(updateNewPostTextActionCreator(newPostText))
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
