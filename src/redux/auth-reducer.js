import { stopSubmit } from 'redux-form'
import { authAPI, profileAPI } from '../api/api'

const SET_USER_DATA = 'network/auth/SET_USER_DATA'
const SET_USER_IMG = 'network/auth/SET_USER_IMG'

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	avatar: null
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
		default:
			return state
	}
}

export const setAuthUserDataAC = (userId, email, login, isAuth) => ({
	type: SET_USER_DATA,
	payload: { userId, email, login, isAuth }
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

export const login = (email, password, rememberMe) => async dispatch => {
	let res = await authAPI.login(email, password, rememberMe)
	if (res.data.resultCode === 0) {
		dispatch(setAuthUserData())
	} else {
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

export default authReducer
