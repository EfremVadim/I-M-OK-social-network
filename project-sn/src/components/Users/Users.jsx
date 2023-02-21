import React from "react";
import styles from './Users.module.css';

const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers(
            [
                {
                    id: 1, photoUrl: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
                    followed: true, fullName: 'Taya', status: 'I am a little squonk',
                    location: { city: 'Krasnodar', country: 'Russia' }
                },
                {
                    id: 2, photoUrl: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
                    followed: false, fullName: 'Elnur', status: 'Nejay sen?',
                    location: { city: 'Baku', country: 'Azerbaijan' }
                },
                {
                    id: 3, photoUrl: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
                    followed: true, fullName: 'Max', status: 'Lets go to Moscow everybody!',
                    location: { city: 'Moscow', country: 'Russia' }
                },
                {
                    id: 4, photoUrl: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
                    followed: false, fullName: 'Serj', status: 'Azino 777',
                    location: { city: 'Budennovsk', country: 'Russia' }
                },
            ]
        )
    }
    return (
        <div>
            {
                props.users.map(u => <div key={u.id} >
                    <span>
                        <div>
                            <img src={u.photoUrl} className={styles.usersPhoto} />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unFollow(u.id) }} >Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }} >Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}


export default Users;