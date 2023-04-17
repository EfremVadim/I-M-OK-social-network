import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, fullName, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile || !fullName) {
        return <Preloader/>
    }

    const onChangeUserPhoto = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    let onSelectedEditMode = () => {
        setEditMode(true)
    }

    let onSubmit = (formData) => {
        saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.profileHeader}>
                <hr/>
            </div>
            <div className={s.fullName}>
                {fullName} (ID: {profile.userId})
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto}/>
            </div>
            <div>{isOwner && <input type="file" onChange={onChangeUserPhoto}/>}</div>
            <div>
                {editMode
                    ? <ProfileDataForm initialValues={profile}
                                       profile={profile}
                                       onSubmit={onSubmit}/>

                    : <ProfileData onSubmit={onSubmit}
                                   profile={profile}
                                   status={status}
                                   updateUserStatus={updateUserStatus}
                                   editMode={editMode}
                                   onSelectedEditMode={onSelectedEditMode}
                                   isOwner={isOwner}
                    />}
            </div>


        </div>
    )
}

const ProfileData = ({profile, status, updateUserStatus, isOwner, onSelectedEditMode}) => {
    return (
        <p>
            <div>
                <p>
                    <b> Status: </b><ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
                </p>
                <b> -My info- </b>
                <div>
                    Looking for a job: {profile.lookingForAJob ? 'Yes' : 'No'}
                    {profile.lookingForAJob &&
                        <div>My professional skills: {profile.lookingForAJobDescription}</div>}
                </div>
                <div>
                    <p>
                        <b>-About me-</b>
                        <div>{profile.aboutMe}</div>
                    </p>
                </div>
                <p>
                    <div>
                        <b> -My Contacts- </b> {Object.keys(profile.contacts).map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                    })
                    }
                    </div>
                    <div>
                        {isOwner && <button onClick={onSelectedEditMode}>Edit Profile Info</button>}
                    </div>

                </p>
            </div>
        </p>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div>{contactTitle}: {contactValue}</div>
}

export default ProfileInfo;