import {InferActionsTypes} from "./redux-store";

let initialState = {}

const sidebarReducer = (state = initialState, action: ActionsType): InitialStateType => {
    return state
}

const actions = {}

export default sidebarReducer

type ActionsType = InferActionsTypes<typeof actions>
type InitialStateType = typeof initialState