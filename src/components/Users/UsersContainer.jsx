import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
	follow,
	getUsersAPI,
	setCurrentPage,
	toggleFollowingProgress,
	unfollow
} from '../../redux/users-reducer'
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers
} from '../../redux/users-selectors'
import Preloader from '../common/Preloader/Preloader'
import Users from './Users'

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.getUsersAPI(this.props.currentPage, this.props.pageSize)
		// this.props.toggleIsFetching(true)

		// usersAPI
		// 	.getUsers(this.props.currentPage, this.props.pageSize)
		// 	.then(data => {
		// 		this.props.toggleIsFetching(false)
		// 		this.props.setUsers(data.items)
		// 		this.props.setTotalUsersCount(data.totalCount)
		// 	})
	}

	onPageChanged = pageNumber => {
		this.props.getUsersAPI(pageNumber, this.props.pageSize)

		// this.props.toggleIsFetching(true)
		// this.props.setCurrentPage(pageNumber)

		// usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
		// 	this.props.toggleIsFetching(false)
		// 	this.props.setUsers(data.items)
		// })
	}

	render() {
		console.log('render')
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
						toggleFollowingProgress={this.props.toggleFollowingProgress}
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

let mapStateToProps = state => {
	console.log('mapStateToProps')
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
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		getUsersAPI
	})
)(UsersContainer)
