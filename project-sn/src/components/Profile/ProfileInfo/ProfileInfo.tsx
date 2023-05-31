import React, {ChangeEvent, useState} from 'react'
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from "./ProfileDataForm"
import {ContactsType, ProfileType} from "../../../types/types"

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                         profile,
                                                         fullName,
                                                         status,
                                                         updateUserStatus,
                                                         isOwner,
                                                         savePhoto,
                                                         saveProfile
                                                     }) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile || !fullName) {
        return <Preloader/>
    }

    const onChangeUserPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files.length) {
            savePhoto(e.target?.files[0])
        }
    }

    let onSelectedEditMode = () => {
        setEditMode(true)
    }
    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
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
                <img src={profile.photos?.large || userPhoto}/>
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

type ProfileDataPropsType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    onSelectedEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({
                                                         profile,
                                                         status,
                                                         updateUserStatus,
                                                         isOwner,
                                                         onSelectedEditMode
                                                     }) => {
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

                        <b> -My Contacts- </b> {
                        Object
                            .keys(profile.contacts)
                            .map(key => {
                                //todo typed profile.contacts
                                //@ts-ignore
                                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
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

const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div>{contactTitle}: {contactValue}</div>
}

export default ProfileInfo

type ContactType = {
    contactTitle: string
    contactValue: string
}
type ProfileInfoPropsType = {
    status: string
    isOwner: boolean
    profile: ProfileType
    fullName: string
    updateUserStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    saveProfile: (Profile: ProfileType) => Promise<any>
}
