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

    let dialogsData = [
        { id: 1, name: 'Taya' },
        { id: 2, name: 'Max' },
        { id: 3, name: 'Serj' },
        { id: 4, name: 'Elnur' },
        { id: 5, name: 'Dima' },
        { id: 6, name: 'Simba' }

    ];

    let messagesData = [
        {id: 1, message: 'Hi' },
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Yoyoyo'},
        {id: 4, message: 'Welcome to the club, buddy'},
        {id: 5, message: 'Lets go'},
        {id: 6, message: 'Meow Meoooow'}
    ];

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name={dialogsData [0] .name} id={dialogsData [0] .id} />
                <DialogItem name={dialogsData [1] .name} id={dialogsData [1] .id} />
                <DialogItem name={dialogsData [2] .name} id={dialogsData [2] .id} />
                <DialogItem name={dialogsData [3] .name} id={dialogsData [3] .id} />
                <DialogItem name={dialogsData [4] .name} id={dialogsData [4] .id} />
                <DialogItem name={dialogsData [5] .name} id={dialogsData [5] .id} />
                
            </div>
            <div className={s.messages}>
                <Message message={messagesData[0] .message} id={messagesData[0] .id} />
                <Message message={messagesData[1] .message} id={messagesData[1] .id} />
                <Message message={messagesData[2] .message} id={messagesData[2] .id} />
                <Message message={messagesData[3] .message} id={messagesData[3] .id} />
                <Message message={messagesData[4] .message} id={messagesData[4] .id} />
                <Message message={messagesData[5] .message} id={messagesData[5] .id} />
            </div>
        </div>

    );
};
export default Dialogs;