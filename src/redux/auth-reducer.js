import { stopSubmit } from 'redux-form'
import { authAPI, profileAPI, securityAPI } from '../api/api'

const SET_USER_DATA = 'network/auth/SET_USER_DATA'
const SET_USER_IMG = 'network/auth/SET_USER_IMG'
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL'

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	avatar: null,
	captchaUrl: null
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload
			}
		case SET_USER_IMG:
			return {
				...state,
				avatar: action.avatar
			}
		case GET_CAPTCHA_URL:
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}

export const setAuthUserDataAC = (userId, email, login, isAuth) => ({
	type: SET_USER_DATA,
	payload: { userId, email, login, isAuth }
})

export const getCaptchaUrlAC = captchaUrl => ({
	type: GET_CAPTCHA_URL,
	payload: { captchaUrl }
})

export const setUserImg = avatar => ({
	type: SET_USER_IMG,
	avatar
})

export const setAuthUserData = () => async dispatch => {
	const authRes = await authAPI.setAuthUserData()
	if (authRes.data.resultCode === 0) {
		const { id, login, email } = authRes.data.data
		dispatch(setAuthUserDataAC(id, email, login, true))

		const profileRes = await profileAPI.getProfile(id)
		dispatch(setUserImg(profileRes.data.photos.small))
	}
}

export const login = (email, password, rememberMe, captcha) => async dispatch => {
	let res = await authAPI.login(email, password, rememberMe, captcha)
	if (res.data.resultCode === 0) {
		dispatch(setAuthUserData())
	} else {
		if (res.data.resultCode === 1) {
			dispatch(getCaptchaURL())
		}
		let message =
			res.data.messages.length > 0 ? res.data.messages[0] : 'Invalid'
		dispatch(stopSubmit('login', { _error: message }))
	}
}

export const logout = () => async dispatch => {
	let res = await authAPI.logout()
	if (res.data.resultCode === 0) {
		dispatch(setAuthUserDataAC(null, null, null, false))
	}
}

export const getCaptchaURL = () => async dispatch => {
	let res = await securityAPI.getCaptchaUrl()
	const captchaUrl = res.data.url

	dispatch(getCaptchaUrlAC(captchaUrl))
}

export default authReducer
