import {profileAPI, usersAPI} from "../api/api";
import React from "react";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_FULL_NAME = 'SET_FULL_NAME';
const SET_USER_ID = 'SET_USER_ID';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hello, how are you', likesCount: 333},
        {id: 2, message: 'It is my first post', likesCount: 777},
    ],
    profile: null,
    fullName: null,
    userId: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
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
export const addPostActionCreator = (newPostText) =>
    ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) =>
    ({type: SET_USER_PROFILE, profile});
export const setFullName = (fullName) =>
    ({type: SET_FULL_NAME, fullName})
export const setUserId = (userId) =>
    ({type: SET_USER_ID, userId})
export const setUserStatus = (status) =>
    ({type: SET_USER_STATUS, status})

export const getUserStatus = (userId) => (dispatch) => {

        profileAPI.getUsersStatus(userId)
            .then(response => {
                    dispatch(setUserStatus(response))
            })
    }

export const updateUserStatus = (status) => (dispatch) => {

        profileAPI.updateUsersStatus(status)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(setUserStatus(status))
                }
            })
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