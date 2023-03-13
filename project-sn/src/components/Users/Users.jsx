import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png'
import {NavLink} from "react-router-dom";
import axios from "axios";
import {usersAPI} from "../../api/api";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let slicedPages;
    let curPage = props.currentPage;
    if (curPage - 3 < 0) {
        slicedPages = pages.slice(0, 5);
    } else {
        slicedPages = pages.slice(curPage - 3, curPage + 2);
    }

    return (<div>
        <div>
            {slicedPages.map(p => {
                return (<span
                    className={props.currentPage === p ? styles.selectedPage : undefined}
                    onClick={(e) => {
                        props.onPageChanged(p)
                    }}> {p}</span>)
            })}
        </div>

        {props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'./../profile/' + u.id}>
                                <img
                                    title={u.name}
                                    alt={u.name}
                                    src={u.photos.small != null ? u.photos.small : userPhoto}
                                    className={styles.usersPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {

                                    usersAPI.unFollowUser(u).then(data => {
                                        if (data.resultCode == 0) {
                                            props.unFollow(u.id)
                                        }
                                    });
                                }}>Unfollow</button>

                                : <button onClick={() => {

                                    usersAPI.followUser(u).then(data => {
                                        if (data.resultCode == 0) {
                                            props.follow(u.id)
                                        }
                                    });
                                }}>Follow</button>}
                        </div>
                    </span>
            <span>
                        <span>
                            <div>Name: {u.name}</div>
                            <div>Status: {u.status}</div>
                        </span>
                        <span>
                            <div>From:
                                {'u.location.country'}
                                {'u.location.city'}</div>
                        </span>
                    </span>
        </div>)}
    </div>)
}

export default Users;