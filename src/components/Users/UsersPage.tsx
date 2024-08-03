import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAPI } from '../../redux/users-reducer'
import {
	getCurrentPage,
	getIsFetching,
	getPageSize
} from '../../redux/users-selectors'
import Preloader from '../common/Preloader/Preloader'
import Users from './Users'

interface UsersPageProps {}

const UsersPage: React.FC<UsersPageProps> = () => {
	const isFetching = useSelector(getIsFetching)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)

	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(getUsersAPI(currentPage, pageSize))
	}, [])

	return <>{isFetching ? <Preloader /> : <Users />}</>
}

export default UsersPage

// class UsersContainer extends React.Component<PropsType> {
// 	componentDidMount() {
// 		const { currentPage, pageSize } = this.props
// 		this.props.getUsersAPI(currentPage, pageSize)
// 	}

// 	render() {
// 		return (
// 			<>
// 				{this.props.isFetching ? (
// 					<Preloader />
// 				) : (
// 					<Users
// 						// users={this.props.users}
// 						// follow={this.props.follow}
// 						// unfollow={this.props.unfollow}
// 						// followingInProgress={this.props.followingInProgress}
// 					/>
// 				)}
// 			</>
// 		)
// 	}
// }

// let mapStateToProps = (state: AppStateType): MapStatePropsType => {
// 	return {
// 		users: getUsers(state),
// 		pageSize: getPageSize(state),
// 		totalUsersCount: getTotalUsersCount(state),
// 		currentPage: getCurrentPage(state),
// 		isFetching: getIsFetching(state),
// 		followingInProgress: getFollowingInProgress(state)
// 	}
// }

// export default compose(
// 	// <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>
// 	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
// 		mapStateToProps,
// 		{
// 			follow,
// 			unfollow,
// 			getUsersAPI
// 		}
// 	)
// )(UsersContainer)
