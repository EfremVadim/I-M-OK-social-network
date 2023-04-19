import React, {useEffect} from "react";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {
    follow, toggleFollowingProgress, setCurrentPage,
    unFollow, requestUsers
} from "../../redux/users-reducer";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching, getPageSize, getStatus,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";

const UsersContainer = (props) => {

    useEffect( () => {
        let {currentPage, pageSize} = props;
        props.getUsers(currentPage, pageSize);
    }, [props.currentPage])

    let onPageChanged = (pageNumber) => {
        let {pageSize} = props;
        props.getUsers(pageNumber, pageSize);
    }
        return <>
            {props.isFetching
                ? <Preloader/>
                : <Users
                    totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    onPageChanged={onPageChanged}
                    follow={props.follow}
                    unFollow={props.unFollow}
                    users={props.users}
                    followingInProgress={props.followingInProgress}
                    status={props.status}

                />}
        </>
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        status: getStatus(state)

    }
}

export default compose(
    connect(mapStateToProps, {
        follow, unFollow, setCurrentPage, toggleFollowingProgress, getUsers: requestUsers
    }),
    withAuthNavigate
)(UsersContainer)
