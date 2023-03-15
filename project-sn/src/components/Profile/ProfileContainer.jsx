import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setFullName, setUserId, setUserProfile} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";

export function withRouter(Children) {

    return (props) => {
        const match = {params: useParams()};

        return <Children {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 28207;
        }

        this.props.setUserProfile(userId)

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
    userId: state.profilePage.userId
})

let WithUrlDataProfileComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    setUserProfile, setFullName, setUserId,
})(withRouter(WithUrlDataProfileComponent));