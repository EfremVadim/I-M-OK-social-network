import {GetItemsType, APIResponseType, instance} from "./api"

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get<GetItemsType>(`users?page=${currentPage}&count${pageSize}`)
            .then(response => response.data)
    },

    followUser(userId: number | null) {
        return instance
            .post<APIResponseType>(`follow/${userId}`, {})
            .then(response => response.data)
    },

    unFollowUser(userId: number | null) {
        return instance
            .delete(`follow/${userId}`).then(response => response.data) as Promise<APIResponseType>
    }
}