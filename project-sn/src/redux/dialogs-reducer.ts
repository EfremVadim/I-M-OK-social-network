import {InferActionsTypes} from "./redux-store"

let initialState = {
    dialogs: [
        {id: 1, name: 'Taya'},
        {id: 2, name: 'Max'},
        {id: 3, name: 'Serj'},
        {id: 4, name: 'Elnur'},
        {id: 5, name: 'Dima'},
        {id: 6, name: 'Simba'}

    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Yoyoyo'},
        {id: 4, message: 'Welcome to the club, buddy'},
        {id: 5, message: 'Lets go'},
        {id: 6, message: 'Meow Meoooow'}
    ]
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE':
            let newMessage = {
                id: 7,
                message: action.dialogNewMessageText,
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }
        default:
            return state
    }
}

export const actions = {
    sendMessageActionCreator: (dialogNewMessageText: string) =>
        ({type: 'SN/DIALOGS/SEND-MESSAGE', dialogNewMessageText} as const)
}

export default dialogsReducer

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
