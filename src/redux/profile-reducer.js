const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
	posts: [
		{ id: 1, message: 'Post 1', likesCount: '12' },
		{ id: 2, message: 'Post 2', likesCount: '7' },
		{ id: 3, message: 'Post 3', likesCount: '2' },
		{ id: 4, message: 'Post 4', likesCount: '3' },
		{ id: 5, message: 'Post 5', likesCount: '14' }
	],
	newPostText: 'text me'
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				message: state.newPostText,
				likesCount: 0
			}
			state.posts.push(newPost)
			state.newPostText = ''
			return state
		case UPDATE_NEW_POST_TEXT:
			state.newPostText = action.newPostText
			return state
		default:
			return state
	}
}

export const addPostActionCreator = () => ({
	type: ADD_POST
})

export const updateNewPostTextActionCreator = newPostText => ({
	type: UPDATE_NEW_POST_TEXT,
	newPostText: newPostText
})

export default profileReducer
