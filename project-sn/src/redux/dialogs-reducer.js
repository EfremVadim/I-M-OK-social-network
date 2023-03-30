const SEND_MESSAGE = 'SEND-MESSAGE';

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
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 7,
                message: action.dialogNewMessageText,
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }
        default:
            return state;
    }
}

// Action-creators
export const sendMessageActionCreater = (dialogNewMessageText) =>
    ({ type: SEND_MESSAGE, dialogNewMessageText});

export default dialogsReducer;