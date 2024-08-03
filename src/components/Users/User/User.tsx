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
						src={user.photos?.small || userPhoto}
						alt=''
					/>
				</NavLink>
				<div>
					{user.followed ? (
						<button
							disabled={followingInProgress.includes(user.id)}
							onClick={() => unfollow(user.id)}
						>
							Unfollow
						</button>
					) : (
						<button
							disabled={followingInProgress.includes(user.id)}
							onClick={() => follow(user.id)}
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
					<p>{user.location?.country || 'Unknown country'}</p>
					<p>{user.location?.city || 'Unknown city'}</p>
				</div>
			</div>
		</div>
	)
}

export default User