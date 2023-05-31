import React, {useEffect} from 'react'
import Profile from "./Profile"
import {connect} from "react-redux"
import {
    actions,
    getUserProfile,
    getUserStatus,
    savePhoto, saveProfile,
    updateUserStatus
} from "../../redux/profile-reducer"
import {withAuthNavigate} from "../../HOC/withAuthNavigate"
import {compose} from "redux"
import {withRouter} from "../../HOC/withRouterComponent"
import {AppStateType} from "../../redux/redux-store"

const ProfileContainer: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    let refreshProfile = () => {
        let userId = props.match.params.userId

        if (!userId) {
            userId = props.authorizedUserId
        }

        if (!userId) {
            props.router.navigate('login')
        }

        props.getUserProfile(userId)
        props.getUserStatus(userId)

        if (!props.match.params.userId) {
            return <Profile {...props}/>
        }
    }

    useEffect( () => {
        refreshProfile()
    },[props.match.params.userId]  )

    // componentDidMount() {
    //     refreshProfile();
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (props.match.params.userId !== prevProps.match.params.userId) {
    //         refreshProfile();
    //     }
    // }

        return (
            <Profile isOwner={!props.match.params.userId} {...props}/>
        )
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    fullName: state.profilePage.fullName,
    userId: state.profilePage.userId,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile, setFullName: actions.setFullName,
        setUserId: actions.setUserId, getUserStatus,
        updateUserStatus, savePhoto, saveProfile
    }),
    withRouter,
    withAuthNavigate
)
(ProfileContainer)

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    match: any
    router: any
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
}
