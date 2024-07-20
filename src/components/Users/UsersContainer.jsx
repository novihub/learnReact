import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
	follow,
	getUsers,
	setCurrentPage,
	toggleFollowingProgress,
	unfollow
} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import Users from './Users'

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize)
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
		this.props.getUsers(pageNumber, this.props.pageSize)

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
						toggleFollowingProgress={this.props.toggleFollowingProgress}
						followingInProgress={this.props.followingInProgress}
					/>
				)}
			</>
		)
	}
}
let mapStateToProps = state => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress
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

export default compose(
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		getUsers
	}),
	withAuthRedirect
)(UsersContainer)
