import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { BrowserRouter } from 'react-router-dom'

import store from './redux/redux-store'

const root = ReactDOM.createRoot(document.getElementById('root'))

export const rerenderEntireTree = state => {
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<App
					store={store}
					state={state}
					dispatch={store.dispatch.bind(store)}
					// addPost={store.addPost.bind(store)}
					// updateNewPostText={store.updateNewPostText.bind(store)}
					// addMessage={store.addMessage.bind(store)}
					// updateNewMessage={store.updateNewMessage.bind(store)}
				/>
			</BrowserRouter>
		</React.StrictMode>
	)
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
	let state = store.getState()
	rerenderEntireTree(state)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
