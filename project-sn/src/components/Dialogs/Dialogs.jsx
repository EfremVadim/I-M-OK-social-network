import React from 'react';
import { sendMessageActionCreater, updateNewMessageTextActionCreater } from '../../redux/state';
import DialogItem from './DialogItem/DialogsItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
    
    let state = props.store.getState().dialogsPage;
    
    let dialogsElements = props.dialogsState.dialogs.map
        (d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = props.dialogsState.messages.map
        (m => <Message message={m.message} id={m.id} />);

    let newMessageText = state.newMessageText;
    
    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageActionCreater());
    }

    let onNewMessageChange = (event) => {
            let text = event.target.value;
            props.store.dispatch(updateNewMessageTextActionCreater(text));
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea
                    placeholder='Enter your message'  
                    value={newMessageText}
                    onChange={onNewMessageChange}/>
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Send Message</button>
                </div>
            </div>
        </div>

    );
};
export default Dialogs;