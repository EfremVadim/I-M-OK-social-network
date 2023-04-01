import React from "react";
import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export const setAuthUser = (userId, email, login, isAuth) =>
    ({type: SET_USER_DATA, payload: {userId, login, email, isAuth}})

export const getAuthUserData = () => {

    return (dispatch) => {
        authAPI.setMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    dispatch(setAuthUser(id, email, login, true));
                }
            });
    }
}
export const login = (email, password, rememberMe) => {

    return (dispatch) => {
        authAPI.getLogin(email, password, rememberMe)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getAuthUserData())
                }
            });
    }
}
export const logout = () => {

    return (dispatch) => {
        authAPI.getLogout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUser(null, null, null, false));
                }
            });
    }
}

export default authReducer;