import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAPI } from '../../redux/users-reducer'
import {
	getCurrentPage,
	getPageSize,
	getTotalUsersCount,
	getUsers
} from '../../redux/users-selectors'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import classes from './Users.module.css'

interface PropsType {}

const Users: FC<PropsType> = () => {
	const totalUsersCount = useSelector(getTotalUsersCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const users = useSelector(getUsers)

	const dispatch = useDispatch()

	const onPageChanged = (pageNumber: number) => {
		dispatch(getUsersAPI(pageNumber, pageSize))
	}

	return (
		<div>
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
