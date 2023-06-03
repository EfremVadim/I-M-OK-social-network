import React from "react"
import {createField, GetStringKeys, Input, Textarea} from "../../Common/FormsControls/FormsControls"
import {InjectedFormProps, reduxForm} from "redux-form"
import style from '../../Common/FormsControls/FormsControls.module.css'
import s from '../ProfileInfo/ProfileInfo.module.css'
import {ProfileType} from "../../../types/types"

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (
    {handleSubmit, profile, error}
) => {

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <b>Full name:</b>
                {createField<ProfileDataFormValuesTypeKeys>(
                    [], 'Full name', 'fullName', Input)}
            </p>
            <p>
                <b>Looking for a job:</b>
                {createField<ProfileDataFormValuesTypeKeys>(
                    [], '', 'lookingForAJob', Input, '', {type: 'checkbox'})}
            </p>
            <p>
                <b>My professional skills:</b>
                {createField<ProfileDataFormValuesTypeKeys>(
                    [], 'Yours professional skills', 'lookingForAJobDescription', Textarea)}
            </p>
            <p>
                <b>About me</b>
                {createField<ProfileDataFormValuesTypeKeys>(
                    [], 'Info about you', 'aboutMe', Textarea)}
            </p>
            <div>
                <b> -My Contacts- </b> {

                Object
                    //@ts-ignore
                    .keys(profile.contacts)
                    .map(key => {
                        return (
                            <div className={s.contact} key={key}>
                                <b>
                                    {/*todo: create some solutions for embedded objects*/}
                                    {key}: {createField(
                                    [], key, "contacts." + key, Input)}
                                </b>
                            </div>
                        )
                    })
            }
            </div>
            <p>   {error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }
            </p>
            <p>
                <div>
                    <button>Save profile info</button>
                </div>
            </p>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>(
    {form: 'editProfile', enableReinitialize: true}
)(ProfileDataForm)

export default ProfileDataReduxForm

type PropsType = {
    profile: ProfileType
}
type ProfileDataFormValuesTypeKeys = GetStringKeys<ProfileType>
