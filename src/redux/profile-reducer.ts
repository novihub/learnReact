import { FormAction, stopSubmit } from 'redux-form'
import { profileAPI } from '../api/profile-api'
import { PhotosType, PostType, ProfileType } from '../types/types'
import { BasedThunkType, InferActionsTypes } from './redux-store'

// Action types
type ActionsType = InferActionsTypes<typeof actions>

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
const profileReducer = (
	state = initialState,
	action: ActionsType
): ProfilePageType => {
	switch (action.type) {
		case 'profile-reducer/ADD_POST':
			const newPost: PostType = {
				id: state.posts.length + 1,
				message: action.newPostText,
				likesCount: 0
			}
			return { ...state, posts: [...state.posts, newPost] }
		case 'profile-reducer/SET_USER_PROFILE':
			return { ...state, profile: action.profile }
		case 'profile-reducer/SET_STATUS':
			return { ...state, status: action.status }
		case 'profile-reducer/DELETE_POST':
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			}
		case 'profile-reducer/SAVE_PHOTO':
			return {
				...state,
				profile: state.profile
					? { ...state.profile, photos: action.photos }
					: null
			}
		case 'profile-reducer/SAVE_PROFILE':
			return {
				...state,
				profile: action.profile
			}
		default:
			return state
	}
}

// Action creators
export const actions = {
	addPostAC: (newPostText: string) =>
		({
			type: 'profile-reducer/ADD_POST',
			newPostText
		}) as const,
	setUserProfileAC: (profile: ProfileType) =>
		({ type: 'profile-reducer/SET_USER_PROFILE', profile }) as const,
	setStatusAC: (status: string) =>
		({
			type: 'profile-reducer/SET_STATUS',
			status
		}) as const,
	deletePostAC: (postId: number) =>
		({
			type: 'profile-reducer/DELETE_POST',
			postId
		}) as const,
	savePhotoAC: (photos: PhotosType) =>
		({
			type: 'profile-reducer/SAVE_PHOTO',
			photos
		}) as const,
	saveProfileAC: (profile: ProfileType) =>
		({
			type: 'profile-reducer/SAVE_PROFILE',
			profile
		}) as const
}

type ThunkType = BasedThunkType<ActionsType | FormAction>

// Thunk actions
export const setUserProfile =
	(userId: number): ThunkType =>
	async dispatch => {
		const res = await profileAPI.getProfile(userId)
		dispatch(actions.setUserProfileAC(res))
	}

export const getStatus =
	(userId: number): ThunkType =>
	async dispatch => {
		const res = await profileAPI.getStatus(userId)
		dispatch(actions.setStatusAC(res))
	}

export const updateStatus =
	(status: string): ThunkType =>
	async dispatch => {
		const res = await profileAPI.updateStatus(status)
		if (res.resultCode === 0) {
			dispatch(actions.setStatusAC(status))
		}
	}

export const savePhoto =
	(file: any): ThunkType =>
	async dispatch => {
		const res = await profileAPI.savePhoto(file)
		if (res.resultCode === 0) {
			dispatch(actions.savePhotoAC(res.data.photos))
		}
	}

export const saveProfile =
	(profile: ProfileType): ThunkType =>
	async (dispatch, getState) => {
		const userId = getState().auth.userId
		if (userId !== null) {
			const res = await profileAPI.saveProfile(profile)
			if (res.data.resultCode === 0) {
				dispatch(setUserProfile(userId))
			} else {
				dispatch(stopSubmit('edit-profile', { _error: res.data.messages[0] }))
				return Promise.reject(res.data.messages[0])
			}
		} else {
			return Promise.reject('User ID is null')
		}
	}

export default profileReducer
