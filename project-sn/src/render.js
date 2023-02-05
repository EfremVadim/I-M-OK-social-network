import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { addPost, updateNewPostText } from './redux/state';


const root = ReactDOM.createRoot(document.getElementById('root'));
export let rerenderEntireTree = (state) => {

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App indexState={state} addPost={addPost} updateNewPostText={updateNewPostText} />
      </BrowserRouter>
    </React.StrictMode>
  );
  
};
