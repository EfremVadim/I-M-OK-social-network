import React from 'react';
import {connect} from "react-redux";
import Music from "./Music";
import {pauseAC, playAC, setAlbumAC} from "../../redux/music-reducer";

const mapStateToProps = (state) => {
    return {
        albums: state.musicPage.albums
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        play: (albumId) => {
            dispatch(playAC(albumId))
        },
        pause: (albumId) => {
            dispatch(pauseAC(albumId))
        },
        setAlbums: (albums) => {
            dispatch(setAlbumAC(albums))
        }
    }
}

const MusicContainer = connect(mapStateToProps, mapDispatchToProps)(Music);

export default MusicContainer;