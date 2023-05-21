import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, Input } from "../Common/FormsControls/FormsControls"
import {required} from "../../utilities/validators/Validators"
import {connect} from "react-redux"
import {login} from "../../redux/auth-reducer"
import {Navigate} from "react-router-dom"
import style from '../Common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../redux/redux-store"

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> =
    ({handleSubmit, error, captchaUrl}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>(
                [required], 'Email', 'email', Input)}
            {createField<LoginFormValuesTypeKeys>(
                [required], 'Password', 'password', Input, '', {type: 'password'})}
            {createField<LoginFormValuesTypeKeys>(
                [], undefined, 'rememberMe', Input, 'remember me', {type: 'checkbox'})}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>(
                    [required], 'Enter text from image', 'captcha', Input)}
            {error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>}
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm)

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Navigate to='/profile'/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}
type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: any) => void
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: any
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

export default connect(mapStateToProps, {login})(Login)