import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'i-am-ok-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'i-am-ok-network/auth/SET_CAPTCHA_SUCCESS';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
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
export const getCaptchaUrlSuccess = (captchaUrl) =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.setMe()

    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setAuthUser(id, email, login, true));
    }
}
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.getLogin(email, password, rememberMe, captcha);

    if (response.resultCode === 0) {
        dispatch(getAuthUserData());
        dispatch(getCaptchaUrlSuccess(null));
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.messages.length > 0 ? response.messages[0] : 'Some Error';
        dispatch(stopSubmit('login', {_error: message}));
    }
}
export const logout = () => async (dispatch) => {
    const response = await authAPI.getLogout()

    if (response.resultCode === 0) {
        dispatch(setAuthUser(null, null, null, false));
    }
}
export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

        dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;