import {profileAPI, usersAPI} from "../api/api"
import {stopSubmit} from "redux-form"
import {PhotosType, PostsType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_FULL_NAME = 'SET_FULL_NAME'
const SET_USER_ID = 'SET_USER_ID'
const SET_USER_STATUS = 'SET_USER_STATUS'
const SET_USER_PHOTO = 'SET_USER_PHOTO'

const initialState = {
    posts: [
        {id: 1, message: 'Hello, how are you', likesCount: 333},
        {id: 2, message: 'It is my first post', likesCount: 777},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    fullName: null as string | null,
    userId: null as number | null,
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {

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
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({
    type: ADD_POST, newPostText
})
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: string
}
export const deletePost = (postId: string): DeletePostActionType => ({
    type: DELETE_POST, postId
})
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
    type: SET_USER_PROFILE, profile
})
type SetFullNameType = {
    type: typeof SET_FULL_NAME
    fullName: string
}
export const setFullName = (fullName: string): SetFullNameType => ({
        type: SET_FULL_NAME, fullName
    })
type SetUserIdType = {
    type: typeof SET_USER_ID
    userId: number
}
export const setUserId = (userId: number): SetUserIdType => ({
    type: SET_USER_ID, userId
})
type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
export const setUserStatus = (status: string): SetUserStatusType => ({
    type: SET_USER_STATUS, status
})
type SavePhotoSuccessType = {
    type: typeof SET_USER_PHOTO
    photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
    type: SET_USER_PHOTO, photos
})

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getUsersStatus(userId)
    dispatch(setUserStatus(response))
}

export const savePhoto = (file: any) => async (dispatch: any) => {

    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {

    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))

    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
        dispatch(stopSubmit('editProfile', {_error: message}))
        return Promise.reject(message)
    }
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateUsersStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const getUserProfile = (userId: number) => async (dispatch: any) => {

    const response = await usersAPI.getProfileData(userId)

    dispatch(setUserProfile(response))
    dispatch(setFullName(response.fullName))
    dispatch(setUserId(response.userId))
}

export default profileReducer