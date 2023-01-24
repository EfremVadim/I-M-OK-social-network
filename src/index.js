import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let posts = [
  { id: 1, message: 'Hi, how are you', likesCount: 333, },
  { id: 2, message: 'It is my first post', likesCount: 777, },

];

let dialogs = [
  { id: 1, name: 'Taya' },
  { id: 2, name: 'Max' },
  { id: 3, name: 'Serj' },
  { id: 4, name: 'Elnur' },
  { id: 5, name: 'Dima' },
  { id: 6, name: 'Simba' }

];

let messages = [
  { id: 1, message: 'Hi' },
  { id: 2, message: 'How are you' },
  { id: 3, message: 'Yoyoyo' },
  { id: 4, message: 'Welcome to the club, buddy' },
  { id: 5, message: 'Lets go' },
  { id: 6, message: 'Meow Meoooow' }
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
