import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utilities/validators/Validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input}
                       validate={[required]}
                       placeholder={'Email'}
                       name={'email'}/>
            </div>
            <div>
                <Field component={Input}
                       validate={[required]}
                       placeholder={'Password'}
                       name={'password'}
                       type={'password'}/>
            </div>
            <span>remember me</span>
            <span>
                <Field component={Input}
                       validate={[required]}
                       type={'checkbox'}
                       name={'rememberMe'}
                />
            </span>
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Navigate to='/profile'/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);