import axios from "axios";
import React from "react";

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
        return instance
            .get(`profile/${userId}`)
            .then(response => {

                return response.data
            });
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
}
