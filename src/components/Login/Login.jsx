import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { required } from '../../utils/validators/validators'
import { createField, Input } from '../hoc/FormsControls/createFormsControls'
import classes from './Login.module.css'

const LoginForm = ({ handleSubmit, error }) => {
	return (
		<form onSubmit={handleSubmit}>
			{/* <Field
					validate={[required]}
					placeholder='email'
					name='email'
					component={Input}
				/> */}
			{createField('Email', 'email', [required], Input)}
			{createField('Password', 'password', [required], Input, {
				type: 'password'
			})}
			{createField(null, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}

			{/* <Field
				validate={[required]}
				placeholder='Password'
				name='password'
				type='password'
				component={Input}
			/> */}

			{/* <Field type='checkbox' name='rememberMe' component={Input} /> */}
			{error && <div className={classes.FormSummaryError}>{error}</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({
	form: 'login'
})(LoginForm)

const Login = ({ login, isAuth }) => {
	const onSubmit = ({ email, password, rememberMe }) => {
		login(email, password, rememberMe)
	}

	if (isAuth) {
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
