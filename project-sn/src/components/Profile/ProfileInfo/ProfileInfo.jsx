import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";

const ProfileInfo = (props) => {

    if(!props.profile){
        return <Preloader/>
    }
    if(!props.fullName){
        return <Preloader/>
    }

    return (
    <div>
      <div className={s.profileHeader}>
<hr/>
      </div>
        <div className={s.fullName}>
            {props.fullName}
        </div>
        <div>
            ID {props.userId}
        </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} />
      </div>
    </div>
  );
};
//AVA https://media.istockphoto.com/id/1348390608/vector/okey-gesture-and-red-eye-im-ok-slogan-vector-hand-drawn-doodle-cartoon-illustration-icon.jpg?s=612x612&w=0&k=20&c=mEFYJBcjNEjMmeS9zhHFk4BiiuuJwMcSWodet80XYg8=
export default ProfileInfo;