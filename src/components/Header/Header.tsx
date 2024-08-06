import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'

type OwnPropsType = {
	logout: () => void
	avatar: string | null
	isAuth: boolean
	login: string
}

const Header: React.FC<OwnPropsType> = props => {
	const logout = () => {
		props.logout()
	}

	return (
		<span className={classes.login}>
			{props.isAuth ? (
				<>
				<div className={classes.logout}>
					<span>{props.login}</span>
					{props.avatar && <img src={props.avatar} alt='User Avatar' />}
				</div>
					<Button onClick={logout}>Logout</Button>
				</>
			) : (
				<div className={classes.logout}>
					<Button>
						<Link to='/login'>Login</Link>
					</Button>
				</div>
			)}
		</span>
	)
}

export default Header
