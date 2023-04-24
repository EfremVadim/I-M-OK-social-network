import {usersAPI} from "../api/api"
import {updateObjectInArray} from "../utilities/object-helpers"
import {UsersType} from "../types/types";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false,
    followingInProgress: [] as Array<number> // array with users id's
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,
                    action.userId,
                    'id',
                    {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,
                    action.userId,
                    'id',
                    {followed: false})
            }
        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

type SetUsersType = {
    type: typeof SET_USERS
    users: UsersType
}
export const setUsers = (users: UsersType): SetUsersType => ({
    type: SET_USERS, users
})
type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => ({
    type: FOLLOW, userId
})
type UnFollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unFollowSuccess = (userId: number): UnFollowSuccessType => ({
    type: UNFOLLOW, userId
})
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE, currentPage
})
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING, isFetching
})
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT, count: totalUsersCount
})
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
})

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page))

    let response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)

    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))

}

export const follow = (userId: number) => async (dispatch: any) => {

    followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followSuccess)
}

export const unFollow = (userId: number) => async (dispatch: any) => {

    followUnfollowFlow(dispatch, userId, usersAPI.unFollowUser.bind(usersAPI), unFollowSuccess)
}

export default usersReducer;