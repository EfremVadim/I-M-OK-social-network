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
        return instance.get(`users?page=${currentPage}&count${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    followUser(u) {
        return instance.post(`follow/${u.id}`, {})
            .then(response => {
                return response.data
            })
    },

    unFollowUser(u) {
        return instance.delete(`follow/${u.id}`)
            .then(response => {
                return response.data
            })
    }
}
