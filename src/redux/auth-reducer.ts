import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodeEnum } from '../api/api'
import { authAPI } from '../api/auth-api'
import { profileAPI } from '../api/profile-api'
import { securityAPI } from '../api/security-api'
import { BasedThunkType, InferActionsTypes } from './redux-store'

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BasedThunkType<ActionsType | FormAction>

let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null,
	avatar: null as any
}

const authReducer = (
	state = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case 'network/auth/SET_USER_DATA':
			return {
				...state,
				userId: action.userId,
				email: action.email,
				login: action.login,
				isAuth: action.isAuth
			}
		case 'network/auth/SET_USER_IMG':
			return {
				...state,
				avatar: action.avatar
			}
		case 'network/auth/GET_CAPTCHA_URL':
			return {
				...state,
				captchaUrl: action.captchaUrl
			}
		default:
			return state
	}
}

const actions = {
	setAuthUserDataAC: (
		userId: number | null,
		email: string | null,
		login: string | null,
		isAuth: boolean
	) =>
		({
			type: 'network/auth/SET_USER_DATA',
			userId,
			email,
			login,
			isAuth
		}) as const,
	getCaptchaUrlAC: (captchaUrl: string) =>
		({
			type: 'network/auth/GET_CAPTCHA_URL',
			captchaUrl
		}) as const,
	setUserImg: (avatar: any) =>
		({
			type: 'network/auth/SET_USER_IMG',
			avatar
		}) as const
}

// type setAuthUserDataActionType = {
// 	type: typeof SET_USER_DATA
// 	payload: {
// 		userId: number | null
// 		email: string | null
// 		login: string | null
// 		isAuth: boolean
// 	}
// }

// type getCaptchaUrlActionType = {
// 	type: typeof GET_CAPTCHA_URL
// 	payload: { captchaUrl: string }
// }

// type setUserImgActionType = {
// 	type: typeof SET_USER_IMG
// 	avatar: any
// }

export const setAuthUserData = (): ThunkType => async dispatch => {
	const authRes = await authAPI.setAuthUserData()
	if (authRes.resultCode === ResultCodeEnum.Success) {
		const { id, login, email } = authRes.data
		dispatch(actions.setAuthUserDataAC(id, email, login, true))
		const profileRes = await profileAPI.getProfile(id)
		dispatch(actions.setUserImg(profileRes.photos.small))
	}
}

export const login =
	(
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: any
	): ThunkType =>
	async dispatch => {
		let res = await authAPI.login(email, password, rememberMe, captcha)
		if (res.resultCode === ResultCodeEnum.Success) {
			dispatch(setAuthUserData())
		} else {
			if (res.resultCode === 1) {
				dispatch(getCaptchaURL())
			}
			let message = res.messages.length > 0 ? res.messages[0] : 'Invalid'
			dispatch(stopSubmit('login', { _error: message }))
		}
	}

export const logout = (): ThunkType => async dispatch => {
	let res = await authAPI.logout()
	if (res.data.resultCode === 0) {
		dispatch(actions.setAuthUserDataAC(null, null, null, false))
	}
}

export const getCaptchaURL = (): ThunkType => async dispatch => {
	let data = await securityAPI.getCaptchaUrl()
	const captchaUrl = data.url

	dispatch(actions.getCaptchaUrlAC(captchaUrl))
}

export default authReducer
