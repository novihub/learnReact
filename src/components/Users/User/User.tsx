import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../../assets/user.png'
import { follow, unfollow } from '../../../redux/users-reducer'
import { getFollowingInProgress } from '../../../redux/users-selectors'
import { UserType } from '../../../types/types'
import classes from './User.module.css'

type PropsType = {
	user: UserType
}
const User: React.FC<PropsType> = ({ user }) => {
	const followingInProgress = useSelector(getFollowingInProgress)

	const dispatch = useDispatch()

	const onFollow = () => {
		dispatch(follow(user.id))
	}

	const onUnfollow = () => {
		dispatch(unfollow(user.id))
	}

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
							onClick={onUnfollow}
						>
							Unfollow
						</button>
					) : (
						<button
							disabled={followingInProgress.includes(user.id)}
							onClick={onFollow}
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
