import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, setFullName, setUserId} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";

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

        this.props.getUserProfile(userId)

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

let AuthNavigateComponent = withAuthNavigate(ProfileContainer);

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    fullName: state.profilePage.fullName,
    userId: state.profilePage.userId,
})

let WithUrlDataProfileComponent = withRouter(AuthNavigateComponent);

export default connect(mapStateToProps, {
    getUserProfile, setFullName, setUserId,
})(withRouter(WithUrlDataProfileComponent));