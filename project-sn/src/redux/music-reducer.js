import React from 'react';

const PLAY = 'PLAY';
const PAUSE = 'PAUSE';
const SET_ALBUM = 'SET_ALBUM';

let initialState = {
    albums: []
}

const musicReducer = (state = initialState, action) => {
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

//action creators
export const playAC = (albumId) => ({type: PLAY, albumId});
export const pauseAC = (albumId) => ({type: PAUSE, albumId});
export const setAlbumAC = (albums) => ({type: SET_ALBUM, albums})


export default musicReducer;