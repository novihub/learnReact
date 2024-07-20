import React from 'react'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../assets/user.png'
import classes from './Users.module.css'

const Users = props => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

	let pages = []

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	let slicedPages
	let curPage = props.currentPage
	if (curPage - 3 < 0) {
		slicedPages = pages.slice(0, 5)
	} else {
		slicedPages = pages.slice(curPage - 3, curPage + 2)
	}
	return (
		<div>
			<div className={classes.Users}>
				{props.users.map(u => (
					<div className={classes.User}>
						<div>
							<NavLink to={'/profile/' + u.id}>
								<img
									src={u.photos.small != null ? u.photos.small : userPhoto}
									alt=''
								/>
							</NavLink>
							<div>
								{u.followed ? (
									<button
										disabled={props.followingInProgress.some(id => id === u.id)}
										onClick={() => {
											props.unfollow(u.id)
											// axios
											// 	.delete(
											// 		`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
											// 		{
											// 			withCredentials: true,
											// 			headers: {
											// 				'API-KEY': '870a1e02-6ff6-4f28-9b60-156aff8dc22e'
											// 			}
											// 		}
											// 	)
											// 			props.toggleFollowingProgress(true, u.id)
											// usersAPI.unfollow(u.id).then(res => {
											// 	if (res.data.resultCode === 0) props.unfollow(u.id)
											// 	props.toggleFollowingProgress(false, u.id)
											// })
										}}
									>
										Unfollow
									</button>
								) : (
									<button
										disabled={props.followingInProgress.some(id => id === u.id)}
										onClick={() => {
											props.follow(u.id)
											// axios
											// 	.post(
											// 		`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
											// 		{},
											// 		{
											// 			withCredentials: true,
											// 			headers: {
											// 				'API-KEY': '870a1e02-6ff6-4f28-9b60-156aff8dc22e'
											// 			}
											// 		}
											// 	)

											// 			props.toggleFollowingProgress(true, u.id)
											// usersAPI.follow(u.id).then(res => {
											// 	if (res.data.resultCode === 0) props.follow(u.id)
											// 	props.toggleFollowingProgress(false, u.id)
											// })
										}}
									>
										Follow
									</button>
								)}
							</div>
						</div>
						<div>
							<h3>{u.name}</h3>
							<h5>{u.status}</h5>
							<div>
								<p>{'u.location.country'}</p>
								<p>{'u.location.city'}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={classes.PageNumbers}>
				{slicedPages.map(p => (
					<span
						onClick={e => props.onPageChanged(p)}
						className={props.currentPage === p ? classes.selectedPage : ''}
					>
						{p}
					</span>
				))}
			</div>
		</div>
	)
}

export default Users
