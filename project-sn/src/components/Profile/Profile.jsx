import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

    return (
        <div className='app-wrapper-content'>
            <ProfileInfo status={props.status} profile={props.profile} fullName={props.fullName} userId={props.userId}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;