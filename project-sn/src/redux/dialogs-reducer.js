const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    dialogs: [
        { id: 1, name: 'Taya' },
        { id: 2, name: 'Max' },
        { id: 3, name: 'Serj' },
        { id: 4, name: 'Elnur' },
        { id: 5, name: 'Dima' },
        { id: 6, name: 'Simba' }

    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you' },
        { id: 3, message: 'Yoyoyo' },
        { id: 4, message: 'Welcome to the club, buddy' },
        { id: 5, message: 'Lets go' },
        { id: 6, message: 'Meow Meoooow' }
    ],
    newMessageText: '',
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let stateCopy = { ...state };
            let newMessage = stateCopy.newMessageText;

            stateCopy.messages = [...state.messages]
            stateCopy.messages.push(
                {
                    id: 7,
                    message: newMessage
                }
            );

            stateCopy.newMessageText = ' ';
            return stateCopy;
        }

        case UPDATE_NEW_MESSAGE_TEXT: {
            let stateCopy = { ...state };
            stateCopy.newMessageText = action.newText
            return stateCopy;

        }

        default:
            return state;
    }
}

// Action-creators
export const sendMessageActionCreater = () =>
    ({ type: SEND_MESSAGE });
export const updateNewMessageTextActionCreater = (text) =>
    ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });

export default dialogsReducer;