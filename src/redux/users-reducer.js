const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

let initialState = {
	users: [
		{
			id: 1,
			photoUrl:
				'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
			followed: true,
			fullName: 'Novikov Maxim',
			status: 'I am a boss',
			location: { city: 'Pavlodar', country: 'Kazahkstan' }
		},
		{
			id: 2,
			photoUrl:
			'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
			followed: true,
			fullName: 'Novikov Maxim',
			status: 'I am a web boss',
			location: { city: 'Pavlodar', country: 'Kazahkstan' }
		},
		{
			id: 3,
			photoUrl:
			'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
			followed: false,
			fullName: 'Novikov Maxim',
			status: 'I am a full boss',
			location: { city: 'Pavlodar', country: 'Kazahkstan' }
		}
	]
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: false }
					}
					return u
				})
			}

		case UNFOLLOW:
			return {	
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: true }
					}
					return u
				})
			}
		case SET_USERS:
			return {
				...state,
				users: [...state.users, ...action.users]
			}
		default:
			return state
	}
}

export const followAC = userId => ({ type: FOLLOW, userId })
export const unfollowAC = userId => ({ type: UNFOLLOW, userId })

export const setUsersAC = users => ({ type: SET_USERS, users })

export default usersReducer
