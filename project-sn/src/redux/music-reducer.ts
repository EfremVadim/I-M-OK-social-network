import {InferActionsTypes} from "./redux-store"

let initialState = {
    albums: [] as Array<any>
}

const musicReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PLAY':
            return {
                ...state,
                albums: state.albums.map(a => {
                    if (a.id === action.albumId) {
                        return {...a, trackStatus: true}
                    }
                    return a;
                })
            }
        case 'PAUSE':
            return {
                ...state,
                albums: state.albums.map(a => {
                    if (a.id === action.albumId) {
                        return {...a, trackStatus: false}
                    }
                    return a;
                })
            }
        case 'SET_ALBUM':
            return {
                ...state, albums: [...state.albums, ...action.albums]
            }
        default:
            return state;
    }
}

export const actions = {
 play: (albumId: number) => ({type: 'PLAY', albumId} as const),
 pause: (albumId: number) => ({type: 'PAUSE', albumId} as const),
 setAlbum: (albums: any) => ({type: 'SET_ALBUM', albums} as const)

}

export default musicReducer

type ActionsType = InferActionsTypes<typeof actions>
type InitialStateType = typeof initialState
