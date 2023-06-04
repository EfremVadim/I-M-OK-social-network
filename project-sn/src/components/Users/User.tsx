import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from "react-router-dom"
import {UsersType} from "../../types/types"

const User: React.FC<PropsType> = ({user, followingInProgress, follow, unFollow}) => {

    return (
        <div>
                    <span>
                        <div>
                            <NavLink to={'./../profile/' + user.id}>
                                <img title={user.name} alt={user.name}
                                     src={user.photos.small != null ? user.photos.small : userPhoto}
                                     className={styles.usersPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        unFollow(user.id)
                                    }}>Unfollow</button>
                                : <button
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        follow(user.id)
                                    }}>Follow</button>}
                        </div>
                    </span>
            <span>
                        <span>
                            <div>Name: {user.name}</div>
                            <div>Status: {user.status ?
                                <span>{user.status}</span> : '-'}
                            </div>

                        </span>
                    </span>
        </div>
    )
}

export default User

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}
