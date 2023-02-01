import React from 'react';
import DialogItem from './DialogItem/DialogsItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {

    let dialogsElements = props.dialogsState.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = props.dialogsState.messages.map(m => <Message message={m.message} id={m.id} />);

    let newMessageElement = React.createRef();
    let sendMessage = () => {
        let textMessage = newMessageElement.current.value
        alert(textMessage);
    };
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea ref={newMessageElement}></textarea>
                </div>
                <div>
                    <button onClick={sendMessage}>send</button>
                </div>
            </div>

        </div>

    );
};
export default Dialogs;