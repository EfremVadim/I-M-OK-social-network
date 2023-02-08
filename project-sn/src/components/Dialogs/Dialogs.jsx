import React from 'react';
import { sendMessageActionCreater, updateNewMessageTextActionCreater } from '../../redux/state';
import DialogItem from './DialogItem/DialogsItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
    let dialogsElements = props.dialogsState.dialogs.map
        (d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = props.dialogsState.messages.map
        (m => <Message message={m.message} id={m.id} />);

    let newMessageElement = React.createRef();
    
    // let sendMessage = () => {
    //     l
    //     props.dispatch(sendMessageActionCreater(newMessageText));
    // };

    let sendMessage = () => {
        props.dispatch(sendMessageActionCreater());
    }

    let onMessageChange = () => {
            let text = newMessageElement.current.value;
            props.dispatch(updateNewMessageTextActionCreater(text));
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
                    ref={newMessageElement} 
                    value={props.newPostText}
                    onChange={onMessageChange}/>
                </div>
                <div>
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>

        </div>

    );
};
export default Dialogs;