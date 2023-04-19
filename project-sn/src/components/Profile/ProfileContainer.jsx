import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    savePhoto, saveProfile,
    setFullName,
    setUserId,
    updateUserStatus
} from "../../redux/profile-reducer";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouterComponent";

const ProfileContainer = (props) => {

    let refreshProfile = () => {
        let userId = props.match.params.userId;

        if (!userId) {
            userId = props.authorizedUserId;
        }

        if (!userId) {
            props.router.navigate('login')
        }

        props.getUserProfile(userId);
        props.getUserStatus(userId);

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

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    fullName: state.profilePage.fullName,
    userId: state.profilePage.userId,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,

})

export default compose(
    connect(mapStateToProps, {
        getUserProfile, setFullName, setUserId, getUserStatus, updateUserStatus, savePhoto, saveProfile
    }),
    withRouter,
    withAuthNavigate
)
(ProfileContainer)