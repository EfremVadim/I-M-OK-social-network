import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utilities/validators/Validators";

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input}
                       validate={[required]}
                       placeholder={'Login'}
                       name={'login'}/>
            </div>
            <div>
                <Field component={Input}
                       validate={[required]}
                       placeholder={'Password'}
                       name={'password'}/>
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
        console.log(formData);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}


export default Login;