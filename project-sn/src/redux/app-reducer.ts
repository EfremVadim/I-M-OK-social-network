import {getAuthUserData} from "./auth-reducer"
import {InferActionsTypes} from "./redux-store"

const initialState = {
    initialized: false,
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "SN/APP/SET_USER_DATA":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/SET_USER_DATA'} as const)
}

export const initializeApp = () => (dispatch: any) => {

    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

export default appReducer