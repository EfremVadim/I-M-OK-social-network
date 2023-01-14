import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';
const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + ' ' + s.active}>
                    <NavLink to='/messages/1'> Taya </NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/messages/2'> Max </NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/messages/3'> Serj </NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/messages/4'> El'nur </NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/messages/5'> Dima </NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi</div>
                <div className={s.message}>How are you?</div>
                <div className={s.message}>Yoyoyo</div>
                <div className={s.message}>Welcome to the club, buddy</div>
                <div className={s.message}>Let's go</div>
            </div>
        </div>

    );
};
export default Dialogs;