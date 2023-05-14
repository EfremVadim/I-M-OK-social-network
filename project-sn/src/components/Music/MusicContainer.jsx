import React from 'react'
import {connect} from "react-redux"
import Music from "./Music"
import {actions} from "../../redux/music-reducer"

const mapStateToProps = (state) => {
    return {
        albums: state.musicPage.albums
    }
}

let play = actions.play
let pause = actions.pause
let setAlbum = actions.setAlbum

const MusicContainer = connect(mapStateToProps, {play, pause, setAlbum})(Music)

export default MusicContainer