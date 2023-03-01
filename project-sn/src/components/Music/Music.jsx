import React from 'react';
import styles from './Music.module.css';

const Music = (props) => {
    if (props.albums.length === 0) {
        props.setAlbums([{
            id: 10,
            artistName: 'Oxxxy',
            albumName: 'Gorgorod',
            imageOfAlbum: 'https://www.creativefabrica.com/wp-content/uploads/2019/02/Music-Icon-by-Kanggraphic-3-580x386.jpg',
            trackStatus: true,
        }, {
            id: 20,
            artistName: 'Max Korzh',
            albumName: 'Maliy Povzroslel',
            imageOfAlbum: 'https://www.creativefabrica.com/wp-content/uploads/2019/02/Music-Icon-by-Kanggraphic-3-580x386.jpg',
            trackStatus: false,
        }, {
            id: 30,
            artistName: 'Big Baby Tape',
            albumName: 'Bandana',
            imageOfAlbum: 'https://www.creativefabrica.com/wp-content/uploads/2019/02/Music-Icon-by-Kanggraphic-3-580x386.jpg',
            trackStatus: false,
        }])
    }
    return (<div>
        {props.albums.map(a => <div key={a.id}>
                <span>
                    <div>
                    Artist: {a.artistName}
                    </div>
                <div>
                    <img title={a.albumName} alt={a.albumName} src={a.imageOfAlbum} className={styles.albumIcon}/>
                </div>
                </span>
            <span>
                <span>
                    Album: {a.albumName}
                </span>
                    <span>
                    {a.trackStatus ? <button className={styles.buttonPlay} onClick={() => props.pause(a.id)}>Pause</button> :
                        <button className={styles.buttonPlay} onClick={() => props.play(a.id)}>Play</button>}
                    </span>
                </span>
        </div>)}
    </div>);
};
export default Music;