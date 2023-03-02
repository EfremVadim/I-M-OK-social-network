import React from 'react';
import s from './Header.module.css';
import headerIcon from '../../assets/images/headerIcon.jpg'

const Header = () => {
    return (
        <div className={s.headerElements}>
            <div className={s.headerText}>
                I'M OK Social Network
            </div>
            <div>
            <header className={s.headerImage}>
                <img src={headerIcon} />
            </header>
            </div>
        </div>
    );
};

export default Header;