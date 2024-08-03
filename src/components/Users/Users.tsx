import React, { FC } from 'react'
import { UserType } from '../../types/types'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import classes from './Users.module.css'

type PropsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	users: Array<UserType>
	followingInProgress: Array<number>
	follow: (userId: number) => void
	unfollow: (userID: number) => void
}
const Users: FC<PropsType> = ({
	totalUsersCount,
	pageSize,
	currentPage,
	onPageChanged,
	users,
	followingInProgress,
	follow,
	unfollow
}) => {
	return (
		<div>
			<div className={classes.Users}>
				{users.map(u => (
					<User
						key={u.id}
						user={u}
						follow={follow}
						unfollow={unfollow}
						followingInProgress={followingInProgress}
					/>
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
