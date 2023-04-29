import axios from "axios"
import {ProfileType} from "../types/types";

//@ts-ignore
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "270c75a8-6a80-47c9-bf0a-febf4eaa4e76"
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    Captcha = 10
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    followUser(userId: number | null) {
        return instance
            .post(`follow/${userId}`, {})
            .then(response => {
                return response.data
            })
    },

    unFollowUser(userId: number | null) {
        return instance
            .delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

    getProfileData(userId: number | null) {
        console.warn('Obsolete method. Please, use a profileApi object')
        return profileAPI.getProfileData(userId);
    },
}

export const profileAPI = {

    getProfileData(userId: number | null) {
        return instance
            .get(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getUsersStatus(userId: number | null) {
        return instance
            .get(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },
    updateUsersStatus(status: string) {
        return instance
            .put(`profile/status/`, {status: status})
            .then(response => {
                return response.data
            })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance
            .put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    },
    saveProfile(profile: ProfileType) {
        return instance
            .put(`profile`, profile)
    }
}

type SetMeType = {
    data: {id: number, email: string, login: string}
    resultCode: number
    messages: Array<string>
}
type LoginType = {
    data: {userId: number}
    resultCode: number
    messages: Array<string>
}

export const authAPI = {

    setMe() {
        return instance
            .get<SetMeType>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    getLogin(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance
            .post<LoginType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    },
    getLogout() {
        return instance
            .delete(`auth/login`)
            .then(response => {
                return response.data
            })
    },
}

export const securityAPI = {

    getCaptchaUrl() {
        return instance
            .get('security/get-captcha-url')
    }
}
