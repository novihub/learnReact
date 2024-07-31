import { stopSubmit } from 'redux-form'
import { PhotosType, PostType, ProfileType } from 'src/types/types'
import { profileAPI } from '../api/api'

// Action types
const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO = 'SAVE_PHOTO'
const SAVE_PROFILE = 'SAVE_PROFILE'

// Types

type ProfilePageType = {
	posts: Array<PostType>
	profile: ProfileType | null
	status: string
}

// Initial state
let initialState: ProfilePageType = {
	posts: [
		{ id: 1, message: 'Post 1', likesCount: 12 },
		{ id: 2, message: 'Post 2', likesCount: 7 },
		{ id: 3, message: 'Post 3', likesCount: 2 },
		{ id: 4, message: 'Post 4', likesCount: 3 },
		{ id: 5, message: 'Post 5', likesCount: 14 }
	],
	profile: null,
	status: ''
}

// Reducer
const profileReducer = (state = initialState, action: any): ProfilePageType => {
	switch (action.type) {
		case ADD_POST:
			const newPost: PostType = {
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
				profile: state.profile
					? { ...state.profile, photos: action.photos }
					: null
			}
		case SAVE_PROFILE:
			return {
				...state,
				profile: action.profile
			}
		default:
			return state
	}
}

// Action creators
type addPostACType = {
	type: typeof ADD_POST
	newPostText: string
}
type setUserProfileACType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
type setStatusACType = {
	type: typeof SET_STATUS
	status: string
}
type deletePostACType = {
	type: typeof DELETE_POST
	postId: number
}
type savePhotoACType = {
	type: typeof SAVE_PHOTO
	photos: PhotosType
}
type saveProfileACType = {
	type: typeof SAVE_PROFILE
	profile: ProfileType
}

export const addPostAC = (newPostText: string): addPostACType => ({
	type: ADD_POST,
	newPostText
})
export const setUserProfileAC = (
	profile: ProfileType
): setUserProfileACType => ({ type: SET_USER_PROFILE, profile })
export const setStatusAC = (status: string): setStatusACType => ({
	type: SET_STATUS,
	status
})
export const deletePostAC = (postId: number): deletePostACType => ({
	type: DELETE_POST,
	postId
})
export const savePhotoAC = (photos: PhotosType): savePhotoACType => ({
	type: SAVE_PHOTO,
	photos
})
export const saveProfileAC = (profile: ProfileType): saveProfileACType => ({
	type: SAVE_PROFILE,
	profile
})

// Thunk actions
export const setUserProfile = (userId: number) => async (dispatch: any) => {
	const res = await profileAPI.getProfile(userId)
	dispatch(setUserProfileAC(res.data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
	const res = await profileAPI.getStatus(userId)
	dispatch(setStatusAC(res.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
	const res = await profileAPI.updateStatus(status)
	if (res.data.resultCode === 0) {
		dispatch(setStatusAC(status))
	}
}

export const savePhoto = (file: any) => async (dispatch: any) => {
	const res = await profileAPI.savePhoto(file)
	if (res.data.resultCode === 0) {
		dispatch(savePhotoAC(res.data.data.photos))
	}
}

export const saveProfile =
	(profile: ProfileType) => async (dispatch: any, getState: any) => {
		const userId = getState().auth.userId
		const res = await profileAPI.saveProfile(profile)
		if (res.data.resultCode === 0) {
			dispatch(setUserProfile(userId))
		} else {
			dispatch(stopSubmit('edit-profile', { _error: res.data.messages[0] }))
			return Promise.reject(res.data.messages[0])
		}
	}

export default profileReducer
