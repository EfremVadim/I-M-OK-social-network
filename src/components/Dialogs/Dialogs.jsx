import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';

const DialogItem = (props) => {
    let path = '/messages/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
};

const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    );
};

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name='Taya' id='1' />
                <DialogItem name='Max' id='2' />
                <DialogItem name='Serj' id='3' />
                <DialogItem name='Elnur' id='4' />
                <DialogItem name='Dima' id='5' />
                <DialogItem name='Simba' id='6' />
            </div>
            <div className={s.messages}>
                <Message message='Hi'/>
                <Message message='How are you?'/>
                <Message message='Yoyoyo'/>
                <Message message='Welcome to the club, buddy'/>
                <Message message='Lets go'/>
                <Message message='Meow Meoooow'/>
            </div>
        </div>

    );
};
export default Dialogs;