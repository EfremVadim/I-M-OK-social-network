import {instance, APIResponseType} from "./api";

type SetMeResponseDataType = {
    id: number, email: string, login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {

    setMe() {
        return instance
            .get<APIResponseType<SetMeResponseDataType>>(`auth/me`)
            .then(response => response.data)
    },
    getLogin(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance
            .post<APIResponseType<LoginResponseDataType>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    getLogout() {
        return instance
            .delete(`auth/login`)
            .then(response => response.data)
    }
}