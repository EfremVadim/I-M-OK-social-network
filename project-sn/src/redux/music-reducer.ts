const PLAY = 'PLAY'
const PAUSE = 'PAUSE'
const SET_ALBUM = 'SET_ALBUM'

let initialState = {
    albums: [] as Array<any>
}

type InitialStateType = typeof initialState

const musicReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case PLAY:
            return {
                ...state,
                albums: state.albums.map(a => {
                    if (a.id === action.albumId) {
                        return {...a, trackStatus: true}
                    }
                    return a;
                })
            }
        case PAUSE:
            return {
                ...state,
                albums: state.albums.map(a => {
                    if (a.id === action.albumId) {
                        return {...a, trackStatus: false}
                    }
                    return a;
                })
            }
        case SET_ALBUM:
            return {
                ...state, albums: [...state.albums, ...action.albums]
            }
        default:
            return state;
    }
}

type PlayACType = {
    type: typeof PLAY
    albumId: number
}
export const playAC = (albumId: number): PlayACType => ({type: PLAY, albumId});
type PauseACType = {
    type: typeof PAUSE
    albumId: number
}
export const pauseAC = (albumId: number): PauseACType => ({type: PAUSE, albumId});
type SetAlbumACType = {
    type: typeof SET_ALBUM
    albums: any
}
export const setAlbumAC = (albums: any): SetAlbumACType => ({type: SET_ALBUM, albums})

export default musicReducer;