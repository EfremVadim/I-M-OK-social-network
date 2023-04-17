import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "270c75a8-6a80-47c9-bf0a-febf4eaa4e76"
    },
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    followUser(userId) {
        return instance
            .post(`follow/${userId}`, {})
            .then(response => {
                return response.data
            })
    },

    unFollowUser(userId) {
        return instance
            .delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

    getProfileData(userId) {
        console.warn('Obsolete method. Please, use a profileApi object')
        return profileAPI.getProfileData(userId);
    },
}

export const profileAPI = {

    getProfileData(userId) {
        return instance
            .get(`profile/${userId}`)
            .then(response => {
                return response.data
            });
    },
    getUsersStatus(userId) {
        return instance
            .get(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },
    updateUsersStatus(status) {
        return instance
            .put(`profile/status/`, {status: status})
            .then(response => {
                return response.data
            })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)

        return instance
            .put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                return response.data
            })
    },
    saveProfile(profile) {
        return instance
            .put('profile', profile)
    }
}

export const authAPI = {

    setMe() {
        return instance
            .get(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    getLogin(email, password, rememberMe = false) {
        return instance
            .post(`auth/login`, {email, password, rememberMe})
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
