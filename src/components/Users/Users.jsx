import axios from 'axios'
import React from 'react'
import userPhoto from '../../assets/images/user.png'
import classes from './Users.module.css'

class Users extends React.Component {
	constructor(props) {
		super(props)
		axios
			.get('https://social-network.samuraijs.com/api/1.0/users')
			.then(res => {
				props.setUsers(res.data.items)
			})
	}

	render() {
		return (
			<div className={classes.Users}>
				{this.props.users.map(u => (
					<div key={u.id} className={classes.User}>
						<div>
							<img
								src={u.photos.small != null ? u.photos.image : userPhoto}
								alt='avatar'
							/>
							<div>
								{u.followed ? (
									<button onClick={() => this.props.follow(u.id)}>
										Unfollow
									</button>
								) : (
									<button onClick={() => this.props.unfollow(u.id)}>
										Follow
									</button>
								)}
							</div>
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
}

export default Users
