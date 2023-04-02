import React from "react";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

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

export const getAuthUserData = () => (dispatch) => {

       return authAPI.setMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    dispatch(setAuthUser(id, email, login, true));
                }
            });
}
export const login = (email, password, rememberMe) => (dispatch) => {

        authAPI.getLogin(email, password, rememberMe)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    let message = data.messages.length > 0 ? data.messages[0] : 'Some Error';
                    dispatch(stopSubmit('login', {_error: message}));
                }
            });
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