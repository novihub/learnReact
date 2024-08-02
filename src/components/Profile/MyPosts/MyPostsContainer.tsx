import { connect } from 'react-redux'
import { actions } from '../../../redux/profile-reducer'
import { AppStateType } from '../../../redux/redux-store' 
import { PostType } from '../../../types/types'
import MyPosts from './MyPosts'

type MapStateToPropsType = {
	posts: PostType[]
}

type MyPostsProps = {
	posts: PostType[]
	newPostText: string
	addPost: (newPostText: string) => void
	deletePost: (postId: number) => void
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
