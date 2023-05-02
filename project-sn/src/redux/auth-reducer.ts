import {authAPI, ResultCodesEnum, ResultCodesEnumForCaptcha, securityAPI} from "../api/api"
import {stopSubmit} from "redux-form"

const SET_USER_DATA = 'i-am-ok-network/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'i-am-ok-network/auth/SET_CAPTCHA_SUCCESS'


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

type SetAuthUserActionPayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean | null
}
type SetAuthUserActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserActionPayloadType
}
export const setAuthUser = (userId: number | null, login: string | null, email: string | null, isAuth: boolean):
    SetAuthUserActionType => ({
    type: SET_USER_DATA,
    payload: {userId, login, email, isAuth}
})
type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string):
    GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

export const getAuthUserData = () => async (dispatch: any) => {
    const setMeData = await authAPI.setMe()

    if (setMeData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = setMeData.data
        dispatch(setAuthUser(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) =>
    async (dispatch: any) => {
        const loginData = await authAPI.getLogin(email, password, rememberMe, captcha)

        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
            dispatch(getCaptchaUrl())

        } else {
            if (loginData.resultCode === ResultCodesEnumForCaptcha.Captcha) {
                dispatch(getCaptchaUrl())
            }
            let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some Error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.getLogout()

    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUser(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer