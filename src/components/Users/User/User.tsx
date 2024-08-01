import React from 'react'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../../assets/user.png'
import { UserType } from '../../../types/types'
import classes from './User.module.css'

type PropsType = {
	user: UserType
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	followingInProgress: Array<number>
}

const User: React.FC<PropsType> = ({
	user,
	follow,
	unfollow,
	followingInProgress
}) => {
	return (
		<div className={classes.User}>
			<div>
				<NavLink to={'/profile/' + user.id}>
					<img
						className={classes.UserImg}
						src={user.photos?.small != null ? user.photos.small : userPhoto}
						alt=''
					/>
				</NavLink>
				<div>
					{user.followed ? (
						<button
							disabled={followingInProgress.some(id => id === user.id)}
							onClick={() => {
								unfollow(user.id)
								// axios
								// 	.delete(
								// 		`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
								// 		{
								// 			withCredentials: true,
								// 			headers: {
								// 				'API-KEY': '870a1e02-6ff6-4f28-9b60-156aff8dc22e'
								// 			}
								// 		}
								// 	)
								// 			props.toggleFollowingProgress(true, user.id)
								// usersAPI.unfollow(user.id).then(res => {
								// 	if (res.data.resultCode === 0) props.unfollow(user.id)
								// 	props.toggleFollowingProgress(false, user.id)
								// })
							}}
						>
							Unfollow
						</button>
					) : (
						<button
							disabled={followingInProgress.some(id => id === user.id)}
							onClick={() => {
								follow(user.id)
								// axios
								// 	.post(
								// 		`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
								// 		{},
								// 		{
								// 			withCredentials: true,
								// 			headers: {
								// 				'API-KEY': '870a1e02-6ff6-4f28-9b60-156aff8dc22e'
								// 			}
								// 		}
								// 	)

								// 			props.toggleFollowingProgress(true, user.id)
								// usersAPI.follow(user.id).then(res => {
								// 	if (res.data.resultCode === 0) props.follow(user.id)
								// 	props.toggleFollowingProgress(false, user.id)
								// })
							}}
						>
							Follow
						</button>
					)}
				</div>
			</div>
			<div>
				<h3>{user.name}</h3>
				<h5>{user.status}</h5>
				<div>
					<p>{'user.location.country'}</p>
					<p>{'user.location.city'}</p>
				</div>
			</div>
		</div>
	)
}

export default User
