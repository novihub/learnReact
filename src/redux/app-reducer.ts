import { InferActionsTypes } from '../redux/redux-store'
import { setAuthUserData } from './auth-reducer'

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const initialState = {
	initialized: false
}

const appReducer = (
	state = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case 'app-reducer/INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true
			}
		default:
			return state
	}
}

export const actions = {
	initializedSuccess: () =>
		({
			type: 'app-reducer/INITIALIZED_SUCCESS'
		}) as const
}

export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(setAuthUserData())
	Promise.all([promise]).then(() => {
		dispatch(actions.initializedSuccess())
	})
}

export default appReducer
