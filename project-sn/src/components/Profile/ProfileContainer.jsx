import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setFullName, setUserProfile} from "../../redux/profile-reducer";
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
            userId = 2;
        }

        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data);
                this.props.setFullName(response.data.fullName);
            });
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
    fullName: state.profilePage.fullName

})

let WithUrlDataProfileComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile, setFullName})(withRouter(WithUrlDataProfileComponent));