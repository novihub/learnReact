import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import classes from './Users.module.css'

const Users = ({
	totalUsersCount,
	pageSize,
	currentPage,
	onPageChanged,
	...props
}) => {
	// let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

	// let pages = []

	// for (let i = 1; i <= pagesCount; i++) {
	// 	pages.push(i)
	// }

	// let slicedPages
	// let curPage = props.currentPage
	// if (curPage - 3 < 0) {
	// 	slicedPages = pages.slice(0, 5)
	// } else {
	// 	slicedPages = pages.slice(curPage - 3, curPage + 2)
	// }
	return (
		<div>
			<div className={classes.Users}>
				{props.users.map(u => (
					<User
						user={u}
						follow={props.follow}
						unfollow={props.unfollow}
						followingInProgress={props.followingInProgress}
					/>
				))}
			</div>
			<Paginator
				totalUsersCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChanged={onPageChanged}
			/>
			{/* <div className={classes.PageNumbers}>
				{slicedPages.map(p => (
					<span
						onClick={e => props.onPageChanged(p)}
						className={props.currentPage === p ? classes.selectedPage : ''}
					>
						{p}
					</span>
				))}
			</div> */}
		</div>
	)
}

export default Users
