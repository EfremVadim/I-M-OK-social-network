import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ProfileType} from "../../types/types"
import {SavePhotoResponseDataType} from "../../api/profileAPI"

type PropsType = {
    status: string
    isOwner: boolean
    profile: ProfileType
    fullName: string
    userId: number
    updateUserStatus: (status: string) => void
    savePhoto: (photoFile: File) => SavePhotoResponseDataType
    saveProfile: (profile: ProfileType) => void
    captchaUrl: string
}

const Profile: React.FC<PropsType> = (props) => {

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

export default Profile