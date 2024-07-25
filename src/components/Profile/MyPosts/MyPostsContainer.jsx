import { connect } from 'react-redux'
import { addPostAC, deletePostAC } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'

let mapStateToProps = state => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText,
	}
}

let mapDispatchToProps = dispatch => {
	return {
		addPost: newPostText => {
			dispatch(addPostAC(newPostText))
		},
		deletePost: postId => {
			dispatch(deletePostAC(postId))
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
