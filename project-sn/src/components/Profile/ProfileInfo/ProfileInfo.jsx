import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png'

const ProfileInfo = ({profile, fullName, userId, status, updateUserStatus, isOwner, savePhoto}) => {

    if (!profile || !fullName) {
        return <Preloader/>
    }

    const onChangeUserPhoto = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={s.profileHeader}>
                <hr/>
            </div>
            <div className={s.fullName}>
                {fullName}
            </div>
            <div>
                ID {userId}
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto}/>
                {isOwner && <input type="file" onChange={onChangeUserPhoto}/>}
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    );
};

export default ProfileInfo;