import axios from 'axios'
import React from 'react'
import classes from './Users.module.css'
import userPhoto from '../../assets/images/user.png'

const Users = props => {
	if (props.users.length === 0) {
		axios
			.get('https://social-network.samuraijs.com/api/1.0/users')
			.then(res => {
				props.setUsers(res.data.items)
			})
	}

	return (
		<div className={classes.Users}>
			{props.users.map(u => (
				<div key={u.id}>
					<div className=''>
						<img src={u.photos.small != null ? u.photos.image : userPhoto} alt='avatar' />
						{u.followed ? (
							<button onClick={() => props.follow(u.id)}>Unfollow</button>
						) : (
							<button onClick={() => props.unfollow(u.id)}>Follow</button>
						)}
					</div>
					<div className=''>
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
	)
}

export default Users
