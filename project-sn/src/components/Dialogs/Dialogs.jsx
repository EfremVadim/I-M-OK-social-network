import React from 'react';
import DialogItem from './DialogItem/DialogsItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import {Navigate} from 'react-router-dom';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utilities/validators/Validators";

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map
    (d => <DialogItem name={d.name} key={d.id} id={d.id}/>);

    let messagesElements = props.dialogsPage.messages.map
    (m => <Message message={m.message} key={m.id} id={m.id}/>);

    let addNewMessage = (values) => {
        props.sendMessage(values.dialogNewMessageText);

    }

    if (!props.isAuth) return <Navigate to='/login'/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}

                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    );
};

let AddMessageForm = (props) => {

    let maxLength50 = maxLengthCreator(50)

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, maxLength50]}
                       placeholder='Enter your message'
                       component={Textarea}
                       name='dialogNewMessageText'/>
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}

let AddMessageReduxForm = reduxForm({form: 'dialogMessageForm'})(AddMessageForm);

export default Dialogs;