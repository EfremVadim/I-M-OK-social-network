import React from "react";
import {usersAPI} from "../api/api";

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
                ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
}

export const authUserSuccess = (userId, email, login) =>
    ({type:SET_USER_DATA, data: {userId, login, email} })

export const setAuthUserData = () => {

    return (dispatch) => {
        usersAPI.setAuthUser()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    dispatch(authUserSuccess(id, email, login));
                }
            });
    }
}

export default authReducer;