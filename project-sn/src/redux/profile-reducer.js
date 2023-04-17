import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_FULL_NAME = 'SET_FULL_NAME';
const SET_USER_ID = 'SET_USER_ID';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SET_USER_PHOTO = 'SET_USER_PHOTO';

const initialState = {
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
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
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
        case SET_USER_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

// Action-creators
export const addPostActionCreator = (newPostText) =>
    ({type: ADD_POST, newPostText});
export const deletePost = (postId) =>
    ({type: DELETE_POST, postId});
export const setUserProfile = (profile) =>
    ({type: SET_USER_PROFILE, profile});
export const setFullName = (fullName) =>
    ({type: SET_FULL_NAME, fullName})
export const setUserId = (userId) =>
    ({type: SET_USER_ID, userId})
export const setUserStatus = (status) =>
    ({type: SET_USER_STATUS, status})
export const savePhotoSuccess = (photos) =>
    ({type: SET_USER_PHOTO, photos})

export const getUserStatus = (userId) => async (dispatch) => {

    const response = await profileAPI.getUsersStatus(userId)

    dispatch(setUserStatus(response))
}
export const savePhoto = (file) => async (dispatch) => {

    const response = await profileAPI.savePhoto(file)

    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {

    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}))
    }
}

export const updateUserStatus = (status) => async (dispatch) => {

    const response = await profileAPI.updateUsersStatus(status)

    if (response.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const getUserProfile = (userId) => async (dispatch) => {

    const response = await usersAPI.getProfileData(userId)

    dispatch(setUserProfile(response))
    dispatch(setFullName(response.fullName))
    dispatch(setUserId(response.userId))
}

export default profileReducer;