import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <div className={s.headerElements}>
            <div>
            <header className={s.headerImage}>
                <img src='https://i.pinimg.com/736x/25/32/27/253227f1e26220ab21aa3fea0f231689.jpg' />
            </header>
            </div>
            <div className={s.headerText}>
                I'M OK Social Network
            </div>
        </div>
    );
};

export default Header;