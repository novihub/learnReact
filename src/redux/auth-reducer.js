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
				...action.data,
				isAuth: true
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

export const setAuthUserData = (userId, email, login) => ({
	type: SET_USER_DATA,
	data: { userId, email, login }
})

export const setUserImg = avatar => ({
	type: SET_USER_IMG,
	avatar
})

export default authReducer
