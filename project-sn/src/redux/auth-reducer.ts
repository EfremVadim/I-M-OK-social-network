import {ResultCodesEnum, ResultCodesForCaptchaEnum} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {authAPI} from "../api/authAPI"
import {securityAPI} from "../api/securityAPI"
import {BaseThunkType, InferActionsTypes} from "./redux-store"

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
        case 'SN/AUTH/GET_CAPTCHA_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUser: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA',
        payload: {userId, login, email, isAuth}
    } as const),

    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/AUTH/GET_CAPTCHA_SUCCESS',
        payload: {captchaUrl}
    } as const)

}

export const getAuthUserData = (): ThunkType =>
    async (dispatch) => {

        const setMeData = await authAPI.setMe()

        if (setMeData.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = setMeData.data
            dispatch(actions.setAuthUser(id, email, login, true))
        }
    }

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
        const loginData = await authAPI.getLogin(email, password, rememberMe, captcha)

        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
            dispatch(getCaptchaUrl())

        } else {
            if (loginData.resultCode === ResultCodesForCaptchaEnum.Captcha) {
                dispatch(getCaptchaUrl())
            }
            let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some Error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }

export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.getLogout()

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUser(null, null, null, false))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
export type InitialStateType = typeof initialState
