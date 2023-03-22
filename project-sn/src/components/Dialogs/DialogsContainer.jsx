import React from 'react';
import {connect} from 'react-redux';
import {sendMessageActionCreater, updateNewMessageTextActionCreater} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageActionCreater())
        },
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextActionCreater(text))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthNavigate
)
(Dialogs);