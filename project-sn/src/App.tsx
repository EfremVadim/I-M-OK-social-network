import React, {useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import Settings from './components/Settings/Settings'
import UsersContainer from './components/Users/UsersContainer'
import MusicContainer from "./components/Music/MusicContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import Login from "./components/Login/login"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/Common/Preloader/Preloader"
import {withRouter} from "./HOC/withRouterComponent"
import {compose} from "redux"
import {Navigate} from "react-router-dom"
import store, {AppStateType} from "./redux/redux-store"
import styles from './App.module.css'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const App: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {

    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occurred - ' + e)
    }

    useEffect(() => {
        props.initializeApp()
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
    }, [])

    // componentWillUnmount()
    // {
    //     window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    // }

    if (!props.initialized) {
        return <Preloader/>
    }

    return (
        <div className={styles.appWrapper}>
            <HeaderContainer/>
            <Navbar/>
            <div className={styles.appWrapperContent}>
                <React.Suspense fallback={<Preloader/>}>
                    <Routes>
                        <Route path='/messages/*' element={<DialogsContainer/>}/>
                        <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                        <Route path='/profile' element={<ProfileContainer/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/music' element={<MusicContainer/>}/>
                        {/*@ts-ignore*/}
                        <Route path='/users/*' element={<UsersContainer pageTitle={"I'M OK USERS:"}/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/' element={<Navigate to={'/profile'}/>}/>
                        <Route path='*' element={<div>Hey, buddy, nice to meet you!</div>}/>
                    </Routes>
                </React.Suspense>
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)

export const ImOkApp: React.FC = () => {
    return <>
            <BrowserRouter>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </BrowserRouter>
    </>
}

export default ImOkApp

type mapStatePropsType = ReturnType<typeof mapStateToProps>
type mapDispatchPropsType = {
    initializeApp: () => void
}
