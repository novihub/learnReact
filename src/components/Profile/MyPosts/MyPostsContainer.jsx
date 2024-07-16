import { connect } from 'react-redux'
import { addPostAC, updatePostTextAC } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'

let mapStateToProps = state => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText
	}
}

let mapDispatchToProps = dispatch => {
	return {
		addPost: () => {
			dispatch(addPostAC())
		},
		updatePostText: e => {
			let newPostText = e.target.value
			dispatch(updatePostTextAC(newPostText))
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
