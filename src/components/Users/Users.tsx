import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { FilterType, getUsersAPI } from '../../redux/users-reducer'
import { UserType } from '../../types/types'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import classes from './Users.module.css'
import UsersSearchForm from './UsersSearchForm'

interface PropsType {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	users: UserType[]
	filter: FilterType
}

const Users: FC<PropsType> = ({
	totalUsersCount,
	filter,
	users,
	pageSize,
	currentPage
}) => {
	const dispatch = useDispatch()

	const onPageChanged = (pageNumber: number) => {
		dispatch(getUsersAPI(pageNumber, pageSize, filter))
	}

	const onFilterChanged = (filter: FilterType) => {
		dispatch(getUsersAPI(1, pageSize, filter))
	}

	return (
		<div>
			<div>
				<h1>Search</h1>
				<UsersSearchForm onFilterChanged={onFilterChanged} filter={filter} />
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
