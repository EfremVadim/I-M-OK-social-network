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

    let dialogs = [
        { id: 1, name: 'Taya' },
        { id: 2, name: 'Max' },
        { id: 3, name: 'Serj' },
        { id: 4, name: 'Elnur' },
        { id: 5, name: 'Dima' },
        { id: 6, name: 'Simba' }

    ];

    let messages = [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you' },
        { id: 3, message: 'Yoyoyo' },
        { id: 4, message: 'Welcome to the club, buddy' },
        { id: 5, message: 'Lets go' },
        { id: 6, message: 'Meow Meoooow' }
    ];

    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = messages.map(m => <Message message={m.message} id={m.id} />);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>

    );
};
export default Dialogs;