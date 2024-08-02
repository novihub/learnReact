import React from 'react'
import { NavLink } from 'react-router-dom'
import userPNG from '../../assets/user.png'
import classes from './Header.module.css'

type OwnPropsType = {
  logout: () => void;
  avatar: string;
  isAuth: boolean;
  login: string;
}

const Header: React.FC<OwnPropsType> = (props) => {
  const logout = () => {
    props.logout()
  }

  return (
    <div className={classes.Header}>
      <div className={classes.loginBlock}>
        {props.avatar ? (
          <img src={props.avatar} alt='User Avatar' />
        ) : (
          <img src={userPNG} alt='Default Avatar' />
        )}
        {props.isAuth ? (
          <div className={classes.logout}>
            {props.login}
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <NavLink to='/login'>Login</NavLink>
        )}
      </div>
    </div>
  )
}

export default Header
