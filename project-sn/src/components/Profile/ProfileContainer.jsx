import React from 'react';
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

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        if (!userId) {
            this.props.router.navigate('login')
        }

        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);

        if (!this.props.match.params.userId) {
            return <Profile {...this.props}/>
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {

        return (
            <Profile isOwner={!this.props.match.params.userId} {...this.props}/>
        )
    }
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