import { profileAPI } from '../api/api'

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO = 'SAVE_PHOTO'

let profilePage = {
	posts: [
		{ id: 1, message: 'Post 1', likesCount: '12' },
		{ id: 2, message: 'Post 2', likesCount: '7' },
		{ id: 3, message: 'Post 3', likesCount: '2' },
		{ id: 4, message: 'Post 4', likesCount: '3' },
		{ id: 5, message: 'Post 5', likesCount: '14' }
	],
	profile: null,
	status: ''
}

let profileReducer = (state = profilePage, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				message: action.newPostText,
				likesCount: 0
			}
			return { ...state, posts: [...state.posts, newPost] }
		case SET_USER_PROFILE:
			return { ...state, profile: action.profile }
		case SET_STATUS:
			return { ...state, status: action.status }
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			}
		case SAVE_PHOTO:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos }
			}
		default:
			return state
	}
}

export const addPostAC = newPostText => ({ type: ADD_POST, newPostText })
export const setUserProfileAC = profile => ({ type: SET_USER_PROFILE, profile })
export const setStatusAC = status => ({ type: SET_STATUS, status })
export const deletePostAC = postId => ({ type: DELETE_POST, postId })
export const savePhotoAC = file => ({ type: SAVE_PHOTO, file })

export const setUserProfile = userId => async dispatch => {
	let res = await profileAPI.getProfile(userId)
	dispatch(setUserProfileAC(res.data))
}

export const getStatus = userId => async dispatch => {
	let res = await profileAPI.getStatus(userId)
	dispatch(setStatusAC(res.data))
}

export const updateStatus = status => async dispatch => {
	let res = await profileAPI.updateStatus(status)
	if (res.data.resultCode === 0) {
		dispatch(setStatusAC(status))
	}
}

export const savePhoto = file => async dispatch => {
	let res = await profileAPI.savePhoto(file)

	if (res.data.resultCode === 0) {
		dispatch(savePhotoAC(res.data.data.photos))
	}
}


export default profileReducer
