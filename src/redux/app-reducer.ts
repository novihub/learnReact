import { setAuthUserData } from './auth-reducer.ts'

const INITIALIZED_SUCCESS: string = 'INITIALIZED_SUCCESS'

type InitialStateType = {
	initialized: boolean
}

const initialState: InitialStateType = {
	initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true
			}
		default:
			return state
	}
}

type initializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({
	type: INITIALIZED_SUCCESS
})

export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(setAuthUserData())
	Promise.all([promise]).then(() => {
		dispatch(initializedSuccess())
	})
}

export default appReducer
