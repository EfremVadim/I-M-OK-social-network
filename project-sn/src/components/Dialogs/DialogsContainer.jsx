import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../../redux/dialogs-reducer';
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
        sendMessage: (dialogNewMessageText) => {
            dispatch(actions.sendMessageActionCreator(dialogNewMessageText))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthNavigate
)
(Dialogs);