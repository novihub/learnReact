import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../utils/helpers/object-helper'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
	users: [],
	pageSize: 12,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, 'id', {
					followed: true
				})
				// state.users.map(u => {
				// 		if (u.id === action.userID) {
				// 			return { ...u, followed: true }
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
					: state.followingInProgress.filter(id => id != action.userID)
			}
		default:
			return state
	}
}

export const followAC = userID => ({ type: FOLLOW, userID })
export const unfollowAC = userID => ({ type: UNFOLLOW, userID })
export const setUsers = users => ({ type: SET_USERS, users })
export const setCurrentPage = currentPage => ({
	type: SET_CURRENT_PAGE,
	currentPage
})
export const setTotalUsersCount = totalUsersCount => ({
	type: SET_TOTAL_USERS_COUNT,
	totalUsersCount
})
export const toggleIsFetching = isFetching => ({
	type: TOGGLE_IS_FETCHING,
	isFetching
})
export const toggleFollowingProgress = (isFetching, userID) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userID
})

export const getUsersAPI = (page, pageSize) => async dispatch => {
	dispatch(toggleIsFetching(true))

	let data = await usersAPI.getUsers(page, pageSize)
	dispatch(toggleIsFetching(false))
	dispatch(setUsers(data.items))
	dispatch(setTotalUsersCount(data.totalCount))
	dispatch(setCurrentPage(page))
}

const toggleFollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userID))
	let res = await apiMethod
	if (res.data.resultCode === 0) dispatch(actionCreator(userID))
	dispatch(toggleFollowingProgress(false, userID))
}

export const follow = userID => async dispatch => {
	toggleFollowFlow(dispatch, userID, usersAPI.follow(userID), followAC)
}

export const unfollow = userID => async dispatch => {
	toggleFollowFlow(dispatch, userID, usersAPI.unfollow(userID), unfollowAC)
}

export default usersReducer
