import React from 'react';
import s from './Header.module.css';
import headerIcon from '../../assets/images/headerIcon.jpg'
import {NavLink} from 'react-router-dom'

const Header = (props) => {
    return (
        <div className={s.headerElements}>
            <div className={s.headerText}>
                I'M OK Social Network
            </div>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
            </div>
            <div>
                <header className={s.headerImage}>
                    <div>
                        <img src={headerIcon}/>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default Header;