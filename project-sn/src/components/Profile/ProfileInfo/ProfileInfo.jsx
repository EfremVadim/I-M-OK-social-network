import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
  return (
    <div>
      <div className={s.profileHeader}>
<hr/>
      </div>
      <div className={s.descriptionBlock}>
        <img src='https://media.istockphoto.com/id/1348390608/vector/okey-gesture-and-red-eye-im-ok-slogan-vector-hand-drawn-doodle-cartoon-illustration-icon.jpg?s=612x612&w=0&k=20&c=mEFYJBcjNEjMmeS9zhHFk4BiiuuJwMcSWodet80XYg8=' />
      </div>
    </div>
  );
};

export default ProfileInfo;