import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { required } from '../../utils/validators/validators'
import { Input } from '../hoc/createFormsControls'
import classes from './Login.module.css'

const LoginForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					validate={[required]}
					placeholder='email'
					name='email'
					component={Input}
				/>
			</div>
			,
			<div>
				,
				<Field
					validate={[required]}
					placeholder='Password'
					name='password'
					type='password'
					component={Input}
				/>
			</div>
			<div>
				<Field type='checkbox' name='rememberMe' component={Input} />
			</div>
			{props.error && (
				<div className={classes.FormSummaryError}>{props.error}</div>
			)}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({
	form: 'login'
})(LoginForm)

const Login = props => {
	const onSubmit = ({ email, password, rememberMe }) => {
		props.login(email, password, rememberMe)
	}

	if (props.isAuth) {
		return <Navigate to='/profile' />
	}

	return (
		<div className={classes.Login}>
			<h1>Access denied! You need to login :(</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	)
}
export default connect(
	state => {
		return {
			isAuth: state.auth.isAuth
		}
	},
	{
		login
	}
)(Login)
