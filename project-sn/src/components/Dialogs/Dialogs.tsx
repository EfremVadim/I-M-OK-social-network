import React from 'react'
import DialogItem from './DialogItem/DialogsItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, GetStringKeys, Textarea} from "../Common/FormsControls/FormsControls"
import {maxLengthCreator, required} from "../../utilities/validators/Validators"
import {InitialStateType} from "../../redux/dialogs-reducer"

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map
    (d => <DialogItem name={d.name} key={d.id} id={d.id}/>)

    let messagesElements = state.messages.map
    (m => <Message message={m.message} key={m.id} id={m.id}/>)

    let addNewMessage = (values: DialogsNewMessageTextFormValuesType) => {
        props.sendMessage(values.dialogNewMessageText)
    }

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
    )
}

let AddMessageForm: React.FC<InjectedFormProps<DialogsNewMessageTextFormValuesType, PropsType> & PropsType> =
    (props) => {

        let maxLength50 = maxLengthCreator(50)

        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<DialogFormValuesTypeKeys>([required, maxLength50],
                        'Enter message',
                        'dialogNewMessageText',
                        Textarea)}
                </div>
                <div>
                    <button>Send Message</button>
                </div>
            </form>
        )
    }

let AddMessageReduxForm =
    reduxForm<DialogsNewMessageTextFormValuesType, PropsType>({form: 'dialogMessageForm'})(AddMessageForm)

type PropsType = {}
type DialogsNewMessageTextFormValuesType = {
    dialogNewMessageText: string
}
type DialogFormValuesTypeKeys = GetStringKeys<DialogsNewMessageTextFormValuesType>
type DialogsPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export default Dialogs