import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, setFullName, setUserId, updateUserStatus} from "../../redux/profile-reducer";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouterComponent";

class ProfileContainer extends React.Component {
    componentDidMount() {

        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);

        if (!this.props.match.params.userId) {
            return <Profile/>
        }
    }

    render() {

        return (
            <Profile {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    fullName: state.profilePage.fullName,
    userId: state.profilePage.userId,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {
        getUserProfile, setFullName, setUserId, getUserStatus, updateUserStatus
    }),
    withRouter,
    withAuthNavigate
)
(ProfileContainer)

// let AuthNavigateComponent = withAuthNavigate(ProfileContainer);
//
// let WithUrlDataProfileComponent = withRouter(AuthNavigateComponent);
//
// connect(mapStateToProps, {
//     getUserProfile, setFullName, setUserId,
// })(withRouter(WithUrlDataProfileComponent))