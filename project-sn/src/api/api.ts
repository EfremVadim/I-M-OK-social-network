import axios from "axios"
import {UsersType} from "../types/types";

//@ts-ignore
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "270c75a8-6a80-47c9-bf0a-febf4eaa4e76"
    }
})

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    Captcha = 10
}
export enum ResultCodesForCaptchaEnum {
    Captcha = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum | ResultCodesForCaptchaEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}