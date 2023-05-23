import React, {useEffect} from "react"
import {connect} from "react-redux"
import Users from "./Users"
import Preloader from "../Common/Preloader/Preloader"
import {follow, unFollow, requestUsers} from "../../redux/users-reducer"
import {withAuthNavigate} from "../../HOC/withAuthNavigate"
import {compose} from "redux"
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching, getPageSize, getStatus,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors"
import {UsersType} from "../../types/types"
import {AppStateType} from "../../redux/redux-store"

type MapStatePropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    status: string
    isFetching: boolean
    users: Array<UsersType>
    followingInProgress: Array<number>
}

type OwnPropsType = {
    pageTitle: string
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type PropsType = MapStatePropsType & OwnPropsType & MapDispatchPropsType

const UsersContainer: React.FC<PropsType> = (props) => {

    useEffect(() => {
        let {currentPage, pageSize} = props;
        props.getUsers(currentPage, pageSize);
    }, [props.currentPage])

    let onPageChanged = (pageNumber: number) => {
        let {pageSize} = props;
        props.getUsers(pageNumber, pageSize);
    }
    return <>
        <h2>{props.pageTitle}</h2>
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
                // @ts-ignore
                status={props.status}
            />}
    </>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
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

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow, unFollow, getUsers: requestUsers
    }),
    withAuthNavigate
)(UsersContainer)
