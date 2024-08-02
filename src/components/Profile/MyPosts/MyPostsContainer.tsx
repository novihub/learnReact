import { connect } from 'react-redux'
import { actions } from '../../../redux/profile-reducer'
import { AppStateType } from '../../../redux/redux-store'
import MyPosts from './MyPosts'

type MapStateToPropsType = {}

type MyPostsProps = {
	isOwner: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
	posts: state.profilePage.posts
})

const mapDispatchToProps = {
	addPost: actions.addPostAC,
	deletePost: actions.deletePostAC
}

const MyPostsContainer = connect<
	MapStateToPropsType,
	typeof mapDispatchToProps,
	MyPostsProps,
	AppStateType
>(
	mapStateToProps,
	mapDispatchToProps
)(MyPosts)

export default MyPostsContainer
