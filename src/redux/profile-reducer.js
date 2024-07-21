import { profileAPI } from '../api/api'

const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

let profilePage = {
	posts: [
		{ id: 1, message: 'Post 1', likesCount: '12' },
		{ id: 2, message: 'Post 2', likesCount: '7' },
		{ id: 3, message: 'Post 3', likesCount: '2' },
		{ id: 4, message: 'Post 4', likesCount: '3' },
		{ id: 5, message: 'Post 5', likesCount: '14' }
	],
	newPostText: 'text me',
	profile: null,
	status: ''
}

let profileReducer = (state = profilePage, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				message: state.newPostText,
				likesCount: 0
			}
			return { ...state, newPostText: '', posts: [...state.posts, newPost] }
		case UPDATE_POST_TEXT:
			return { ...state, newPostText: action.newPostText }
		case SET_USER_PROFILE:
			return { ...state, profile: action.profile }
		case SET_STATUS:
			return { ...state, status: action.status }
		default:
			return state
	}
}

export const addPostAC = () => ({ type: ADD_POST })

export const updatePostTextAC = newPostText => ({
	type: UPDATE_POST_TEXT,
	newPostText: newPostText
})

export const setUserProfileAC = profile => ({ type: SET_USER_PROFILE, profile })

export const setStatusAC = status => ({ type: SET_STATUS, status })

export const setUserProfile = userId => dispatch => {
	profileAPI.getProfile(userId).then(res => {
		dispatch(setUserProfileAC(res.data))
	})
}

export const getStatus = userId => dispatch => {
	profileAPI.getStatus(userId).then(res => {
		console.log(res)
		dispatch(setStatusAC(res.data))
	})
}

export const updateStatus = status => dispatch => {
	profileAPI.updateStatus(status).then(res => {
		if (res.data.resultCode === 0) {
			dispatch(setStatusAC(status))
		}
	})
}

export default profileReducer
