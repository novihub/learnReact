import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterType, getUsersAPI } from '../../redux/users-reducer'
import {
	getCurrentPage,
	getFollowedUsers,
	getPageSize,
	getTerm,
	getTotalUsersCount,
	getUsers
} from '../../redux/users-selectors'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import classes from './Users.module.css'
import UsersSearchForm from './UsersSearchForm'

interface PropsType {}

const Users: FC<PropsType> = () => {
	const totalUsersCount = useSelector(getTotalUsersCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const users = useSelector(getUsers)
	const term = useSelector(getTerm)
	const isFollowed = useSelector(getFollowedUsers)

	const dispatch = useDispatch()

	const onPageChanged = (pageNumber: number) => {
		dispatch(getUsersAPI(pageNumber, pageSize, term, isFollowed))
	}

	const onFilterChanged = (filter: FilterType) => {
		dispatch(getUsersAPI(1, pageSize, filter.term, filter.isFollowed))
	}

	return (
		<div>
			<div>
				<h1>Search</h1>
				<UsersSearchForm onFilterChanged={onFilterChanged} term={term} isFollowed={isFollowed}/>
			</div>
			<div className={classes.Users}>
				{users.map(u => (
					<User key={u.id} user={u} />
				))}
			</div>
			<Paginator
				totalUsersCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChanged={onPageChanged}
			/>
		</div>
	)
}

export default Users
