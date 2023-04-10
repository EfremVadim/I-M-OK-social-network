import React from "react";
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

class UsersContainer extends React.Component {

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unFollow={this.props.unFollow}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                    status={this.props.status}

                />}
        </>
    }
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
