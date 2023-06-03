import React from 'react'
import s from './Post.module.css'
import userPhoto from '../../../../assets/images/user.png'

type PropsType = {
    message: string
    likesCount: number
    id: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src={userPhoto}/>
            {props.message}
            <div>
                <span>
                    like: {props.likesCount}
                </span>
            </div>
        </div>
    )
}

export default Post