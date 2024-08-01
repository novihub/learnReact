import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'
import { follow, getUsersAPI, unfollow } from '../../redux/users-reducer'
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers
} from '../../redux/users-selectors'
import { UserType } from '../../types/types'
import Preloader from '../common/Preloader/Preloader'
import Users from './Users'

type MapStatePropsType = {
	currentPage: number
	pageSize: number
	isFetching: boolean
	totalUsersCount: number
	users: Array<UserType>
	followingInProgress: Array<number>
}

type MapDispatchPropsType = {
	getUsersAPI: (currentPage: number, pageSize: number) => void
	follow: (userID: number) => void
	unfollow: (userID: number) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		const { currentPage, pageSize } = this.props
		this.props.getUsersAPI(currentPage, pageSize)
		// this.props.toggleIsFetching(true)

		// usersAPI
		// 	.getUsers(this.props.currentPage, this.props.pageSize)
		// 	.then(data => {
		// 		this.props.toggleIsFetching(false)
		// 		this.props.setUsers(data.items)
		// 		this.props.setTotalUsersCount(data.totalCount)
		// 	})
	}

	onPageChanged = (pageNumber: number) => {
		const { pageSize } = this.props
		this.props.getUsersAPI(pageNumber, pageSize)

		// this.props.toggleIsFetching(true)
		// this.props.setCurrentPage(pageNumber)

		// usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
		// 	this.props.toggleIsFetching(false)
		// 	this.props.setUsers(data.items)
		// })
	}

	render() {
		return (
			<>
				{this.props.isFetching ? (
					<Preloader />
				) : (
					<Users
						totalUsersCount={this.props.totalUsersCount}
						pageSize={this.props.pageSize}
						currentPage={this.props.currentPage}
						onPageChanged={this.onPageChanged}
						users={this.props.users}
						follow={this.props.follow}
						unfollow={this.props.unfollow}
						followingInProgress={this.props.followingInProgress}
					/>
				)}
			</>
		)
	}
}

// let mapDispatchToProps = dispatch => {
// 	return {
// 		follow: userID => {
// 			dispatch(followAC(userID))
// 		},
// 		unfollow: userID => {
// 			dispatch(unfollowAC(userID))
// 		},
// 		setUsers: users => {
// 			dispatch(setUsersAC(users))
// 		},
// 		setCurrentPage: pageNumber => {
// 			dispatch(setCurrentPageAC(pageNumber))
// 		},
// 		setTotalUsersCount: totalCount => {
// 			dispatch(setTotalUsersCountAC(totalCount))
// 		},
// 		toggleIsFetching: isFetching => {
// 			dispatch(toggleIsFetchingAC(isFetching))
// 		}
// 	}
// }

// let mapStateToProps = state => {
// 	return {
// 		users: state.usersPage.users,
// 		pageSize: state.usersPage.pageSize,
// 		totalUsersCount: state.usersPage.totalUsersCount,
// 		currentPage: state.usersPage.currentPage,
// 		isFetching: state.usersPage.isFetching,
// 		followingInProgress: state.usersPage.followingInProgress
// 	}
// }

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
}

export default compose(
	// <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultState>
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
		mapStateToProps,
		{
			follow,
			unfollow,
			getUsersAPI
		}
	)
)(UsersContainer)
