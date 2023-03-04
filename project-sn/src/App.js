import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import MusicContainer from "./components/Music/MusicContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

const App = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/messages/*' element={<DialogsContainer/>}/>
                    <Route path='/profile' element={<ProfileContainer/>}/>
                    <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                    <Route path='/music' element={<MusicContainer/>}/>
                    <Route path='/users/*' element={<UsersContainer/>}/>
                </Routes>
            </div>
        </div>
    );
}


export default App;