import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

  return (
    <div className='app-wrapper-content'>
      <ProfileInfo />
      <MyPosts
        posts={props.profileState.posts}
        addPost={props.addPost} />
    </div>
  );
};

export default Profile;