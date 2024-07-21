import React from 'react'
import { Field, reduxForm } from 'redux-form'
import classes from './Login.module.css'

const LoginForm = props => {
	console.log(props)
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field placeholder='Login' name='login' component='input' />
			</div>
			<div>
				<Field placeholder='Password' name='password' component='input' />
			</div>
			<div>
				<Field type='checkbox' name='rememberMe' component='input' />
			</div>
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
	const onSubmit = (formData) => {
		console.log(formData)
	}

	return (
		<div className={classes.Login}>
			<h1>Access denied! You need to login :(</h1>
			<LoginReduxForm onSubmit={onSubmit}/>
		</div>
	)
}
export default Login
