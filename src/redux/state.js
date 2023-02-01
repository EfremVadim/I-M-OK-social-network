import { rerenderEntireTree } from "../render";

let state = {
    profilePage: {
        posts: [
            { id: 1, message: 'Hi, how are you', likesCount: 333, },
            { id: 2, message: 'It is my first post', likesCount: 777, },
        ],
    },

    dialogsPage: {
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

    },
    sidebar: {},
};

export let addPost = (postMessage) => {
    let newPost = {
        id: 3,
        message: postMessage,
        likesCount: 0,
    };
    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
};


export default state;