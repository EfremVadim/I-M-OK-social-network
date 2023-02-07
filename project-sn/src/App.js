import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/messages/*' element={<Dialogs
            dialogsState={props.indexState.dialogsPage} />} />
          <Route path='/profile' element={<Profile
            profileState={props.indexState.profilePage}
            addPost={props.addPost}
            updateNewPostText={props.updateNewPostText} />} />
          <Route path='/news' element={<News />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/music' element={<Music />} />
        </Routes>
      </div>
    </div>
  );
}





export default App;