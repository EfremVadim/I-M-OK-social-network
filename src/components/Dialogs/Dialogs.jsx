import React from 'react';
import s from './Dialogs.module.css';
const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + ' ' + s.active}>
                    Taya
                </div>
                <div className={s.dialog}>
                    Max
                </div>
                <div className={s.dialog}>
                    Serj
                </div>
                <div className={s.dialog}>
                    El'nur
                </div>
                <div className={s.dialog}>
                    Dima
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