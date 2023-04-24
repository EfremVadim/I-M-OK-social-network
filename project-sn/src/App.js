import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import MusicContainer from "./components/Music/MusicContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {withRouter} from "./HOC/withRouterComponent";
import {compose} from "redux";
import {Navigate} from "react-router-dom";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const App = (props) => {

    const catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert('Some error occurred')
        console.error(promiseRejectionEvent)
    }

    useEffect(() => {
        props.initializeApp();
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
    }, [])

    // componentWillUnmount()
    // {
    //     window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    // }

    // if (!props.initialized) {
    //     return <Preloader/>
    // }
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <React.Suspense fallback={<Preloader/>}>
                    <Routes>
                        <Route path='/messages/*' element={<DialogsContainer/>}/>
                        <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                        <Route path='/profile' element={<ProfileContainer/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/music' element={<MusicContainer/>}/>
                        <Route path='/users/*' element={<UsersContainer/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/' element={<Navigate to={'/profile'}/>}/>
                        <Route path='*' element={<div>Hey, buddy, nice to meet you!</div>}/>
                    </Routes>
                </React.Suspense>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);