import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, fullName, userId, status, updateUserStatus}) => {

    if (!profile || !fullName) {
        return <Preloader/>
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
                <img
                    src="https://media.istockphoto.com/id/1348390608/vector/okey-gesture-and-red-eye-im-ok-slogan-vector-hand-drawn-doodle-cartoon-illustration-icon.jpg?s=612x612&w=0&k=20&c=mEFYJBcjNEjMmeS9zhHFk4BiiuuJwMcSWodet80XYg8="/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large}/>

                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    );
};

export default ProfileInfo;