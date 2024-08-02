import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { required } from '../../utils/validators/validators'
import { createField, Input } from '../hoc/FormsControls/createFormsControls'
import classes from './Login.module.css'

export type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}

type LoginFormValuesTypeKeys = keyof LoginFormValuesType

type LoginFormOwnProps = {
	captchaUrl: string | null
}

const LoginForm: React.FC<
	InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit}>
			{/* <Field
					validate={[required]}
					placeholder='email'
					name='email'
					component={Input}
				/> */}
			{createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
			{createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {
				type: 'password'
			})}
			{createField<LoginFormValuesTypeKeys>(
				'',
				'rememberMe',
				[],
				Input,
				{ type: 'checkbox' },
				'remember me'
			)}
			{captchaUrl && <img src={captchaUrl} alt='' />}
			{captchaUrl &&
				createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
	form: 'login'
})(LoginForm)

type MapStatePropsType = {
	isAuth: boolean
	captchaUrl: string | null
	userId: number | null
}

type MapDispatchPropsType = {
	login: (
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: string
	) => void
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({
	login,
	isAuth,
	captchaUrl,
	userId
}) => {
	const onSubmit = (formData: LoginFormValuesType) => {
		const { email, password, rememberMe, captcha } = formData
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
	(state: any) => {
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
