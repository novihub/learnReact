import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../hoc/createFormsControls'
import classes from './Login.module.css'
import { required } from '../../utils/validators/validators'

const LoginForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field validate={[required]} placeholder='Login' name='login' component={Input} />
			</div>,
			<div>,
				<Field validate={[required]} placeholder='Password' name='password' component={Input} />
			</div>
			<div>
				<Field type='checkbox' name='rememberMe' component={Input} />
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
	const onSubmit = formData => {
		console.log(formData)
	}

	return (
		<div className={classes.Login}>
			<h1>Access denied! You need to login :(</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	)
}
export default Login
