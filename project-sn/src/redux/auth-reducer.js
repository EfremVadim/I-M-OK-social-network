import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'i-am-ok-network/auth/SET_USER_DATA';

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

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.setMe()

    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setAuthUser(id, email, login, true));
    }
}
export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.getLogin(email, password, rememberMe)

    if (response.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : 'Some Error';
        dispatch(stopSubmit('login', {_error: message}));
    }
}
export const logout = () => async (dispatch) => {
    let response = await authAPI.getLogout()

    if (response.resultCode === 0) {
        dispatch(setAuthUser(null, null, null, false));
    }
}

export default authReducer;