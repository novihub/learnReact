import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dialogs = [
  { id: 1, name: 'Dimych' },
  { id: 2, name: 'Sasha' },
  { id: 3, name: 'Max' },
  { id: 4, name: 'Victor' },
  { id: 1, name: 'Valera' },
  { id: 5, name: 'Alina' }
]

let messages = [
  { id: 1, message: 'Hi' },
  { id: 2, message: 'Hello' },
  { id: 3, message: 'How are you' },
  { id: 4, message: 'Where are you from' },
  { id: 5, message: 'Whats up' },
  { id: 6, message: 'Bye' }
]

let posts = [
  { id: 0, message: 'First', likesCount: 1 },
  { id: 1, message: 'Second', likesCount: 12 },
  { id: 2, message: 'Third', likesCount: 123 },
  { id: 3, message: 'Fourth', likesCount: 1234 }
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App dialogs={dialogs} posts={posts} messages={messages} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
