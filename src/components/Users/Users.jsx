import React from 'react'
import classes from './Users.module.css'
import userPhoto from '../../assets/images/user.png'

const Users = props => {
	let pages = []

	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	let curP = props.currentPage
	let curPF = curP - 5 < 0 ? 0 : curP - 5
	let curPL = curP + 5
	let slicedPages = pages.slice(curPF, curPL)

	return (
		<>
			<div>
				{slicedPages.map(p => {
					return (
						<span
							onClick={event => {
								props.onPageChanged(p)
							}}
							className={props.currentPage === p && classes.selectedPage}
						>
							{p + ' '}
						</span>
					)
				})}
			</div>
			<div className={classes.Users}>
				{props.users.map(u => (
					<div key={u.id} className={classes.User}>
						<div>
							<img
								src={u.photos.small != null ? u.photos.image : userPhoto}
								alt='avatar'
							/>
							<div>
								{u.followed ? (
									<button onClick={() => props.follow(u.id)}>
										Unfollow
									</button>
								) : (
									<button onClick={() => props.unfollow(u.id)}>
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
		</>
	)
}

export default Users