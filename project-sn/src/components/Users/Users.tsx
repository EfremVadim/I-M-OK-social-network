import React from 'react';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../types/types";

type PropsType = {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

const Users: React.FC<PropsType> = (
    {
        onPageChanged,
        currentPage,
        totalUsersCount,
        pageSize,
        users,
        ...props
    }) => {

    return (
        <div>
            <Paginator onPageChanged={onPageChanged}
                       currentPage={currentPage}
                       totalUsersCount={totalUsersCount}
                       pageSize={pageSize}/>
            <div>
                {users.map(u => <User user={u}
                                      key={u.id}
                                      followingInProgress={props.followingInProgress}
                                      follow={props.follow}
                                      unFollow={props.unFollow}
                    />
                )}
            </div>
        </div>
    )
}

export default Users;