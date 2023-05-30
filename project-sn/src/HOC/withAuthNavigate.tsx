import React from 'react'
import {Navigate} from "react-router-dom"
import {connect} from "react-redux"
import {AppStateType} from "../redux/redux-store"

const mapStateToPropsForNavigate = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as MapStatePropsType)

type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {}

export function withAuthNavigate<WCP extends MapStatePropsType>(WrappedComponent: React.ComponentType<WCP>) {

    let NavigateComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Navigate to='/login'/>
        return <WrappedComponent {...restProps as WCP} />
    }

    return connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(mapStateToPropsForNavigate, {})(NavigateComponent)
}