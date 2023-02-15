import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <div className='app-wrapper-content'>
      <ProfileInfo />
      <MyPostsContainer
        store={props.store}/>
    </div>
  );
};

export default Profile;