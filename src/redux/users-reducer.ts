import { Dispatch } from 'react'
import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../api/api'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/helpers/object-helper'
import { AppStateType, InferActionsTypes } from './redux-store'

type initialStateType = {
	users: Array<UserType>
	pageSize: number
	totalUsersCount: number
	currentPage: number
	isFetching: boolean
	followingInProgress: Array<number> // array of userId
}

let initialState: initialStateType = {
	users: [],
	pageSize: 12,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
}

const usersReducer = (
	state = initialState,
	action: ActionsType
): initialStateType => {
	switch (action.type) {
		case 'FOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, 'id', {
					followed: true
				})
				// state.users.map(u => {
				// 		if (u.id === action.userID) {
				// 			return { ...u, followed: true }`
				// 		}
				// 		return u
				// 	})
				// }
			}
		case 'UNFOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, 'id', {
					followed: false
				})
			}
		case 'SET_USERS':
			return {
				...state,
				users: [...action.users]
			}
		case 'SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.currentPage
			}
		case 'SET_TOTAL_USERS_COUNT':
			return {
				...state,
				totalUsersCount: action.totalUsersCount
			}
		case 'TOGGLE_IS_FETCHING':
			return {
				...state,
				isFetching: action.isFetching
			}
		case 'TOGGLE_IS_FOLLOWING_PROGRESS':
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userID]
					: state.followingInProgress.filter(id => id !== action.userID)
			}
		default:
			return state
	}
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
	followAC: (userID: number) =>
		({
			type: 'FOLLOW',
			userID
		}) as const,
	unfollowAC: (userID: number) =>
		({
			type: 'UNFOLLOW',
			userID
		}) as const,
	setUsers: (users: Array<UserType>) =>
		({
			type: 'SET_USERS',
			users
		}) as const,
	setCurrentPage: (currentPage: number) =>
		({
			type: 'SET_CURRENT_PAGE',
			currentPage
		}) as const,
	setTotalUsersCount: (totalUsersCount: number) =>
		({
			type: 'SET_TOTAL_USERS_COUNT',
			totalUsersCount
		}) as const,
	toggleIsFetching: (isFetching: boolean) =>
		({
			type: 'TOGGLE_IS_FETCHING',
			isFetching
		}) as const,
	toggleFollowingProgress: (isFetching: boolean, userID: number) =>
		({
			type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
			isFetching,
			userID
		}) as const
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUsersAPI =
	(page: number, pageSize: number): ThunkType =>
	async dispatch => {
		dispatch(actions.toggleIsFetching(true))

		let data = await usersAPI.getUsers(page, pageSize)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
		dispatch(actions.setTotalUsersCount(data.totalCount))
		dispatch(actions.setCurrentPage(page))
	}

const _toggleFollowFlow = async (
	dispatch: Dispatch<ActionsType>,
	userID: number,
	apiMethod: any,
	actionCreator: (userId: number) => ActionsType
) => {
	dispatch(actions.toggleFollowingProgress(true, userID))
	let res = await apiMethod
	if (res.data.resultCode === 0) dispatch(actionCreator(userID))
	dispatch(actions.toggleFollowingProgress(false, userID))
}

export const follow =
	(userID: number): ThunkType =>
	async dispatch => {
		_toggleFollowFlow(
			dispatch,
			userID,
			usersAPI.follow(userID),
			actions.followAC
		)
	}

export const unfollow =
	(userID: number): ThunkType =>
	async dispatch => {
		_toggleFollowFlow(
			dispatch,
			userID,
			usersAPI.unfollow(userID),
			actions.unfollowAC
		)
	}

export default usersReducer
