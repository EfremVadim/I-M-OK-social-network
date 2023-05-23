import React from 'react'
import {connect} from 'react-redux'
import {actions} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {withAuthNavigate} from "../../HOC/withAuthNavigate"
import {compose} from "redux"
import {AppStateType} from "../../redux/redux-store"

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageText: state.dialogsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.sendMessage}),
    withAuthNavigate
)
(Dialogs)