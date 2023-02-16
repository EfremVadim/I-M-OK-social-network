import React from 'react';
import { sendMessageActionCreater, updateNewMessageTextActionCreater } from '../../redux/dialogs-reducer';
import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>{(store) => {

            let state = store.getState();

            let onSendMessageClick = () => {
                store.dispatch(sendMessageActionCreater());
            }
            let onNewMessageChange = (text) => {
                store.dispatch(updateNewMessageTextActionCreater(text));
            }
            return (<Dialogs
                sendMessage={onSendMessageClick}
                updateNewMessageText={onNewMessageChange}
                dialogsPage={state.dialogsPage}
                newMessageText={state.dialogsPage.newMessageText} />
            )
        }
        }</StoreContext.Consumer>
    )
}
export default DialogsContainer;