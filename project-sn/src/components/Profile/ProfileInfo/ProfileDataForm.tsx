import React from "react"
import {createField, Input, Textarea} from "../../Common/FormsControls/FormsControls"
import {reduxForm} from "redux-form"
import style from '../../Common/FormsControls/FormsControls.module.css'
import s from '../ProfileInfo/ProfileInfo.module.css'

const ProfileDataForm = ({handleSubmit, profile, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <b>Full name:</b>
                {createField(
                    [], 'Full name', 'fullName', Input)}
            </p>
            <p>
                <b>Looking for a job:</b>
                {createField(
                    [], '', 'lookingForAJob', Input, '', {type: 'checkbox'})}
            </p>
            <p>
                <b>My professional skills:</b>
                {createField(
                    [], 'Yours professional skills', 'lookingForAJobDescription', Textarea)}
            </p>
            <p>
                <b>About me</b>
                {createField(
                    [], 'Info about you', 'aboutMe', Textarea)}
            </p>
            <div>
                <b> -My Contacts- </b> {Object.keys(profile.contacts).map(key => {
                return (
                    <div className={s.contact} key={key}>
                        <b>
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

const ProfileDataReduxForm = reduxForm({form: 'editProfile', enableReinitialize: true})(ProfileDataForm)

export default ProfileDataReduxForm