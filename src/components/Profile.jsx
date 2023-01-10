import React from 'react';
import s from './Profile.module.css';
const Profile = () => {
  return <div className={s.content}>
    <div>
      <img src='data:image/png;base64,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' />
    </div>
    <div>
      ava + description
      <img src='https://media.istockphoto.com/id/1348390608/vector/okey-gesture-and-red-eye-im-ok-slogan-vector-hand-drawn-doodle-cartoon-illustration-icon.jpg?s=612x612&w=0&k=20&c=mEFYJBcjNEjMmeS9zhHFk4BiiuuJwMcSWodet80XYg8=' />
    </div>
    <div>
      My posts
      <div>
        New post
      </div>
      <div className={s.posts}>
        <div className={s.item}>
          post 1
        </div>
        <div className={s.item}>
          post 2
        </div>
      </div>
    </div>
  </div>
};

export default Profile;