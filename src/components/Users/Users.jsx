import React from 'react'
import classes from './Users.module.css'

const Users = props => {
	if (props.users.length === 0) {
		props.setUsers([
			{
				id: 1,
				photoUrl:
					'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
				followed: true,
				fullName: 'Novikov Maxim',
				status: 'I am a boss',
				location: { city: 'Pavlodar', country: 'Kazahkstan' }
			},
			{
				id: 2,
				photoUrl:
					'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
				followed: true,
				fullName: 'Novikov Maxim',
				status: 'I am a web boss',
				location: { city: 'Pavlodar', country: 'Kazahkstan' }
			},
			{
				id: 3,
				photoUrl:
					'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
				followed: false,
				fullName: 'Novikov Maxim',
				status: 'I am a full boss',
				location: { city: 'Pavlodar', country: 'Kazahkstan' }
			}
		])
	}

	return (
		<div className={classes.Users}>
			{props.users.map(u => (
				<div key={u.id}>
					<div className=''>
						<img src={u.photoUrl} alt='avatar' />
						{u.followed ? (
							<button onClick={() => props.follow(u.id)}>Unfollow</button>
						) : (
							<button onClick={() => props.unfollow(u.id)}>Follow</button>
						)}
					</div>
					<div className=''>
						<h3>{u.fullName}</h3>
						<h5>{u.status}</h5>
						<div>
							<p>{u.location.country}</p>
							<p>{u.location.city}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Users
