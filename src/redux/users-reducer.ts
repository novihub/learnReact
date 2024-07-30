import { usersAPI } from '../api/api'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/helpers/object-helper'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

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

const usersReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type) {
		case FOLLOW:
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
		case UNFOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, 'id', {
					followed: false
				})
			}
		case SET_USERS:
			return {
				...state,
				users: [...action.users]
			}
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage
			}
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.totalUsersCount
			}
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching
			}
		case TOGGLE_IS_FOLLOWING_PROGRESS:
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

type followACType = {
	type: typeof FOLLOW
	userID: number
}
type unfollowACType = {
	type: typeof UNFOLLOW
	userID: number
}
type setUsersType = {
	type: typeof SET_USERS
	users: Array<UserType>
}
type setCurrentPageType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
type setTotalUsersCountType = {
	type: typeof SET_TOTAL_USERS_COUNT
	totalUsersCount: number
}
type toggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
type toggleFollowingProgressType = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
	isFetching: boolean
	userID: number
}

export const followAC = (userID: number): followACType => ({
	type: FOLLOW,
	userID
})
export const unfollowAC = (userID: number): unfollowACType => ({
	type: UNFOLLOW,
	userID
})
export const setUsers = (users: Array<UserType>): setUsersType => ({
	type: SET_USERS,
	users
})
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({
	type: SET_CURRENT_PAGE,
	currentPage
})
export const setTotalUsersCount = (
	totalUsersCount: number
): setTotalUsersCountType => ({
	type: SET_TOTAL_USERS_COUNT,
	totalUsersCount
})
export const toggleIsFetching = (
	isFetching: boolean
): toggleIsFetchingType => ({
	type: TOGGLE_IS_FETCHING,
	isFetching
})
export const toggleFollowingProgress = (
	isFetching: boolean,
	userID: number
): toggleFollowingProgressType => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userID
})

export const getUsersAPI =
	(page: number, pageSize: number) => async (dispatch: any) => {
		dispatch(toggleIsFetching(true))

		let data = await usersAPI.getUsers(page, pageSize)
		dispatch(toggleIsFetching(false))
		dispatch(setUsers(data.items))
		dispatch(setTotalUsersCount(data.totalCount))
		dispatch(setCurrentPage(page))
	}

const toggleFollowFlow = async (
	dispatch: any,
	userID: number,
	apiMethod: any,
	actionCreator: any
) => {
	dispatch(toggleFollowingProgress(true, userID))
	let res = await apiMethod
	if (res.data.resultCode === 0) dispatch(actionCreator(userID))
	dispatch(toggleFollowingProgress(false, userID))
}

export const follow = (userID: number) => async (dispatch: any) => {
	toggleFollowFlow(dispatch, userID, usersAPI.follow(userID), followAC)
}

export const unfollow = (userID: number) => async (dispatch: any) => {
	toggleFollowFlow(dispatch, userID, usersAPI.unfollow(userID), unfollowAC)
}

export default usersReducer
