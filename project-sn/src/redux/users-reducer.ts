import {updateObjectInArray} from "../utilities/object-helpers"
import {UsersType} from "../types/types"
import {ResultCodesEnum, usersAPI} from "../api/api"
import {AppStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false,
    followingInProgress: [] as Array<number> // array with users id's
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed: true}
                )
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed: false}
                )
            }
        case "SET_USERS": {
            return {
                ...state, users: action.users
            }
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case "SET_TOTAL_USERS_COUNT": {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case "TOGGLE_IS_FETCHING": {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setUsers: (users: Array<UsersType>) => ({
    type: 'SET_USERS', users
} as const),
    followSuccess: (userId: number) => ({
    type: 'FOLLOW', userId
} as const),
    unFollowSuccess: (userId: number) => ({
    type: 'UNFOLLOW', userId
} as const),
    setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE', currentPage
} as const),
    toggleIsFetching: (isFetching: boolean) => ({
    type: 'TOGGLE_IS_FETCHING', isFetching
} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount
} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId
} as const)
}

type DispatchType = Dispatch<ActionsTypes>
type GetStateType = () => AppStateType
type ThunkType = ThunkAction<Promise<void>, GetStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType =>
    async (dispatch, getState) => {

        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))

        let response: any = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(response.items))
        dispatch(actions.setTotalUsersCount(response.totalCount))
    }

const _followUnfollowFlow =
    async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
        dispatch(actions.toggleFollowingProgress(true, userId))

        let response = await apiMethod(userId)

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actionCreator(userId))
        }
        dispatch(actions.toggleFollowingProgress(false, userId))
    }

export const follow = (userId: number): ThunkType =>
    async (dispatch) => {

        _followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.followSuccess)
    }

export const unFollow = (userId: number): ThunkType =>
    async (dispatch) => {

        _followUnfollowFlow(dispatch, userId, usersAPI.unFollowUser.bind(usersAPI), actions.unFollowSuccess)
    }

export default usersReducer