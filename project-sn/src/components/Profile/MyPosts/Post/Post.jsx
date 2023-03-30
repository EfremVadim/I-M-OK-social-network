import React from 'react';
import s from './Post.module.css';
const Post = (props) => {
  return (

    <div className={s.item}>
      <img src="https://media.istockphoto.com/id/1348390608/vector/okey-gesture-and-red-eye-im-ok-slogan-vector-hand-drawn-doodle-cartoon-illustration-icon.jpg?s=612x612&w=0&k=20&c=mEFYJBcjNEjMmeS9zhHFk4BiiuuJwMcSWodet80XYg8=" />
      { props.message }
      <div>
        <span>Like</span> { props.likesCount }
      </div>
    </div>

  );
};

export default Post;                                                                                                                  