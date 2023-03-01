import React from 'react';
import axios from "axios";
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png'

class Users extends React.Component {

    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let slicedPages;
        let curPage = this.props.currentPage;
        if (curPage - 3 < 0) {
            slicedPages = pages.slice(0, 5);
        } else {
            slicedPages = pages.slice(curPage - 3, curPage + 2);
        }

        return (<div>

            <div>
                {slicedPages.map(p => {
                    return (<span
                        className={this.props.currentPage === p
                            ? styles.selectedPage
                            : undefined}
                        onClick={(e) => {
                            this.onPageChanged(p)
                        }}> {p}</span>)
                })}
            </div>

            {this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img
                                title={u.name}
                                alt={u.name}
                                src={u.photos.small != null ? u.photos.small : userPhoto}
                                className={styles.usersPhoto}/>
                        </div>
                        <div>
                            {u.followed ? <button onClick={() => {
                                this.props.unFollow(u.id)
                            }}>Unfollow</button> : <button onClick={() => {
                                this.props.follow(u.id)
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
}

export default Users;