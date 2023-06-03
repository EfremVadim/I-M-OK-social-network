import {PhotosType, PostsType, ProfileType} from "../types/types"
import {ResultCodesEnum} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {Dispatch} from "redux"
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store"
import {ThunkAction} from "redux-thunk"
import {profileAPI} from "../api/profileAPI"

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

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SN/PROFILE/SET_FULL_NAME':
            return {
                ...state,
                fullName: action.fullName
            }
        case 'SN/PROFILE/SET_USER_ID':
            return {
                ...state,
                userId: action.userId
            }
        case 'SN/PROFILE/SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SN/PROFILE/SET_USER_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

export const actions = {
    addPost: (newPostText: string) => ({
        type: 'SN/PROFILE/ADD-POST', newPostText
    } as const),
    deletePost: (postId: number) => ({
        type: 'SN/PROFILE/DELETE_POST', postId
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: 'SN/PROFILE/SET_USER_PROFILE', profile
    } as const),
    setFullName: (fullName: string) => ({
        type: 'SN/PROFILE/SET_FULL_NAME', fullName
    } as const),
    setUserId: (userId: number) => ({
        type: 'SN/PROFILE/SET_USER_ID', userId
    } as const),
    setUserStatus: (status: string) => ({
        type: 'SN/PROFILE/SET_USER_STATUS', status
    } as const),
    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'SN/PROFILE/SET_USER_PHOTO', photos
    } as const )
}

export const getUserStatus = (userId: number): ThunkType =>
    async (dispatch) => {

        const data = await profileAPI.getUsersStatus(userId)

        dispatch(actions.setUserStatus(data))
    }

export const savePhoto = (file: File): ThunkType =>
    async (dispatch) => {

        const response = await profileAPI.savePhoto(file)

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.savePhotoSuccess(response.data.photos))
        }
    }

export const saveProfile = (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {

        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(profile)

        if (response.resultCode === ResultCodesEnum.Success) {
            if (userId != null) {
                dispatch(getUserProfile(userId))
            } else {
                throw new Error("User ID can't be null")
            }
        } else {
            let message = response.messages.length > 0 ? response.messages[0] : 'Some Error'
            dispatch(stopSubmit('editProfile', {_error: message}))
            return Promise.reject(message)
        }
    }

export const updateUserStatus = (status: string): ThunkType =>
    async (dispatch) => {

        const response = await profileAPI.updateUsersStatus(status)

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setUserStatus(status))
        }
    }

export const getUserProfile = (userId: number | null): ThunkType =>
    async (dispatch) => {

        const response = await profileAPI.getProfileData(userId)

        dispatch(actions.setUserProfile(response))
        dispatch(actions.setFullName(response.fullName))
        dispatch(actions.setUserId(response.userId))
    }

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
