import React from 'react';
import s from './Post.module.css';
import userPhoto from '../../../../assets/images/user.png'

const Post = (props) => {

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
    );
};

export default Post;                                                                                                                  