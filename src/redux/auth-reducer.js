import { authAPI, profileAPI } from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA'
const SET_USER_IMG = 'SET_USER_IMG'

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

export const setAuthUserData = () => dispatch => {
	authAPI.setAuthUserData().then(res => {
		if (res.data.resultCode === 0) {
			let { id, login, email } = res.data.data
			dispatch(setAuthUserDataAC(id, email, login, true))
			profileAPI.getProfile(id).then(res => {
				dispatch(setUserImg(res.data.photos.small))
			})
		}
		if (res.data.resultCode === 10) {
			let { id, login, email } = res.data.data
			dispatch(setAuthUserDataAC(id, email, login, true))
			profileAPI.getProfile(id).then(res => {
				dispatch(setUserImg(res.data.photos.small))
			})
		}
	})
}

export const login = (email, password, rememberMe) => dispatch => {
	authAPI.login(email, password, rememberMe).then(res => {
		if (res.data.resultCode === 0) {
			dispatch(setAuthUserData())
		}
	})
}

export const logout = () => dispatch => {
	authAPI.logout().then(res => {
		if (res.data.resultCode === 0) {
			dispatch(setAuthUserDataAC(null, null, null, false))
		}
	})
}

export default authReducer
