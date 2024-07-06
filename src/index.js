import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import state from './redux/state'
import {
	addMessage,
	addPost,
	subscribe,
	updateNewMessage,
	updateNewPostText
} from './redux/state'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
let rerenderEntireTree = (state) => {
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<App
					state={state}
					addPost={addPost}
					updateNewPostText={updateNewPostText}
					addMessage={addMessage}
					updateNewMessage={updateNewMessage}
				/>
			</BrowserRouter>
		</React.StrictMode>
	)
}

rerenderEntireTree(state)


subscribe(rerenderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
