import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

    return (
        <div className='app-wrapper-content'>
            <ProfileInfo status={props.status}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         fullName={props.fullName}
                         userId={props.userId}
                         updateUserStatus={props.updateUserStatus}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
                         captchaUrl={props.captchaUrl}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;