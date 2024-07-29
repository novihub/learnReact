import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer.ts'
import { required } from '../../utils/validators/validators'
import { createField, Input } from '../hoc/FormsControls/createFormsControls'
import classes from './Login.module.css'

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
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
			{createField(
				null,
				'rememberMe',
				[],
				Input,
				{ type: 'checkbox' },
				'remember me'
			)}
			{captchaUrl && <img src={captchaUrl} alt='' />}
			{captchaUrl &&
				createField('Symbols from image', 'captcha', [required], Input, {})}
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

const Login = ({ login, isAuth, captchaUrl, userId }) => {
	const onSubmit = ({ email, password, rememberMe, captcha }) => {
		login(email, password, rememberMe, captcha)
	}

	if (isAuth) {
		return <Navigate to={`/profile/${userId}`} />
	}

	return (
		<div className={classes.Login}>
			<h1>Access denied! You need to login :(</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>
	)
}
export default connect(
	state => {
		return {
			isAuth: state.auth.isAuth,
			captchaUrl: state.auth.captchaUrl,
			userId: state.auth.userId
		}
	},
	{
		login
	}
)(Login)
