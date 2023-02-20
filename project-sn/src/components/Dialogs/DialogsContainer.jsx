import { connect } from 'react-redux';
import { sendMessageActionCreater, updateNewMessageTextActionCreater } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);





export default DialogsContainer;