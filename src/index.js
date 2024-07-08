import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { BrowserRouter } from 'react-router-dom'

import store from './redux/state'

const root = ReactDOM.createRoot(document.getElementById('root'))

export const rerenderEntireTree = state => {
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<App
					state={state}
					addPost={store.addPost.bind(store)}
					updateNewPostText={store.updateNewPostText.bind(store)}
          addMessage={store.addMessage.bind(store)}
          updateNewMessage={store.updateNewMessage.bind(store)}
				/>
			</BrowserRouter>
		</React.StrictMode>
	)
}

rerenderEntireTree(store.getState())

store.subscriber(rerenderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
