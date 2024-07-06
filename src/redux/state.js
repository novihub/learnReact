import { rerenderEntireTree } from '../render'


let state = {
	profilePage: {
		posts: [
			{ id: 0, message: 'First', likesCount: 1 },
			{ id: 1, message: 'Second', likesCount: 12 },
			{ id: 2, message: 'Third', likesCount: 123 },
			{ id: 3, message: 'Fourth', likesCount: 1234 }
		],
		newPostText: 'maxon'
	},
	dialogsPage: {
		dialogs: [
			{ id: 1, name: 'Dimych' },
			{ id: 2, name: 'Sasha' },
			{ id: 3, name: 'Max' },
			{ id: 4, name: 'Victor' },
			{ id: 1, name: 'Valera' },
			{ id: 5, name: 'Alina' }
		],
		messages: [
			{ id: 1, message: 'Hi' },
			{ id: 2, message: 'Hello' },
			{ id: 3, message: 'How are you' },
			{ id: 4, message: 'Where are you from' },
			{ id: 5, message: 'Whats up' },
			{ id: 6, message: 'Bye' }
		]
	}
}

export let addPost = () => {
	let newPost = {
		id: 5,
		message: state.profilePage.newPostText,
		likesCount: 0
	}

	state.profilePage.posts.push(newPost)
	state.profilePage.newPostText = ''
	rerenderEntireTree(state)
}

export let updateNewPostText = (newText) => {
	state.profilePage.newPostText = newText
	rerenderEntireTree(state)
}

export default state
