import {usersAPI} from "../api/api";
import React from "react";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_FULL_NAME = 'SET_FULL_NAME';
const SET_USER_ID = 'SET_USER_ID';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hello, how are you', likesCount: 333},
        {id: 2, message: 'It is my first post', likesCount: 777},
    ],
    newPostText: '',
    profile: null,
    fullName: null,
    userId: null,
    status: null,
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case ADD_POST:
            let newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_FULL_NAME:
            return {
                ...state,
                fullName: action.fullName
            }
        case SET_USER_ID:
            return {
                ...state,
                userId: action.userId
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

// Action-creators
export const addPostActionCreator = () =>
    ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (profile) =>
    ({type: SET_USER_PROFILE, profile});
export const setFullName = (fullName) =>
    ({type: SET_FULL_NAME, fullName})
export const setUserId = (userId) =>
    ({type: SET_USER_ID, userId})
export const setUserStatus = (status) =>
    ({type: SET_USER_STATUS, status})

export const getUserStatus = (userId) => {

    return (dispatch) => {

        usersAPI.getUserStatus(userId)
            .then(data => {
                dispatch(setUserStatus(data))
            })
    }
}

export const getUserProfile = (userId) => {

    return (dispatch) => {

        usersAPI.getProfileData(userId)
            .then(data => {
                dispatch(setUserProfile(data))
                dispatch(setFullName(data.fullName))
                dispatch(setUserId(data.userId))
            })
    }
}

export default profileReducer;