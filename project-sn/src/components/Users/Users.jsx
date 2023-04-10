import React from 'react';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

const Users = ({onPageChanged, currentPage, totalUsersCount, pageSize, users, ...props}) => {

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