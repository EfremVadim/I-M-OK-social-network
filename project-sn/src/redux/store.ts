// // Development an object 'Store' for example and training
//
// import profileReducer from "./profile-reducer"
// import dialogsReducer from "./dialogs-reducer"
// import sidebarReducer from "./sidebar-reducer"
// import {PostsType} from "../types/types"
//
// type ProfilePageType = {
//     posts: PostsType
//     newPostText: string
// }
// type DialogsType = {
//     id: number
//     name: string
// }
// type DialogsPageType = {
//     dialogs: DialogsType
//     messages: MessagesType
//     newMessageText: string
// }
// type MessagesType = {
//     id: number
//     message: string
// }
// type StateType = {
//     profilePage: ProfilePageType
//     dialogsPage: DialogsPageType
//     sidebar: any
// }
// type StoreType = {
//     _callSubscriber: () => void
//     getState: () => void
//     subscribe: (observer: any) => void
//     dispatch: (action: any) => void
// }
//
// let store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: 'Hello, how are you', likesCount: 333,},
//                 {id: 2, message: 'It is my first post', likesCount: 777,},
//             ],
//             newPostText: '',
//         },
//
//         dialogsPage: {
//             dialogs: [
//                 {id: 1, name: 'Taya'},
//                 {id: 2, name: 'Max'},
//                 {id: 3, name: 'Serj'},
//                 {id: 4, name: 'Elnur'},
//                 {id: 5, name: 'Dima'},
//                 {id: 6, name: 'Simba'}
//
//             ],
//             messages: [
//                 {id: 1, message: 'Hi'},
//                 {id: 2, message: 'How are you'},
//                 {id: 3, message: 'Yoyoyo'},
//                 {id: 4, message: 'Welcome to the club, buddy'},
//                 {id: 5, message: 'Lets go'},
//                 {id: 6, message: 'Meow Meoooow'}
//             ],
//             newMessageText: '',
//
//         },
//         sidebar: {},
//     },
//     _callSubscriber() {
//         console.log('State was changed')
//     },
//     getState() {
//         return this._state
//     },
//     subscribe(observer: any) {
//         this._callSubscriber = observer
//     },
//     dispatch(action: any) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//
//         this._callSubscriber(this._state)
//     }
// }
//
// export default store