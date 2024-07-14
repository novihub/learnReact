import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import {
	followAC,
	setCurrentPageAC,
	setIsFetchingAC,
	setTotalUsersCountAC,
	setUsersAC,
	unfollowAC
} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
import Users from './Users'

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.toggleIsFetching(true)
		axios
			.get(
				`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
			)
			.then(res => {
				this.props.toggleIsFetching(false)
				this.props.setUsers(res.data.items)
				this.props.setTotalUsersCount(res.data.totalCount)
			})
	}

	onPageChanged = pageNumber => {
		this.props.setCurrentPage(pageNumber)
		this.props.toggleIsFetching(true)
		axios
			.get(
				`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
			)
			.then(res => {
				this.props.toggleIsFetching(false)
				this.props.setUsers(res.data.items)
			})
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
		isFetching: state.usersPage.isFetching
	}
}

let mapDispatchToProps = dispatch => {
	return {
		follow: userId => {
			dispatch(followAC(userId))
		},
		unfollow: userId => {
			dispatch(unfollowAC(userId))
		},
		setUsers: users => {
			dispatch(setUsersAC(users))
		},
		setCurrentPage: pageNumber => {
			dispatch(setCurrentPageAC(pageNumber))
		},
		setTotalUsersCount: totalCount => {
			dispatch(setTotalUsersCountAC(totalCount))
		},
		toggleIsFetching: isFetching => {
			dispatch(setIsFetchingAC(isFetching))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
