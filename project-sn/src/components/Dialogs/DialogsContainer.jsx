import React from 'react';
import { sendMessageActionCreater, updateNewMessageTextActionCreater } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
    let state = props.store.getState();

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageActionCreater());
    }

    let onNewMessageChange = (text) => {
        props.store.dispatch(updateNewMessageTextActionCreater(text));
    }

    return (<Dialogs
        sendMessage={onSendMessageClick}
        updateNewMessageText={onNewMessageChange}
        dialogsPage={state.dialogsPage}
        newMessageText={state.dialogsPage.newMessageText} />);
};

export default DialogsContainer;