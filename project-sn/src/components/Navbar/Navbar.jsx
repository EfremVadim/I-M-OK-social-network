import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div>
                <span><NavLink to='/profile' className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink></span>
            </div>
            <div>
                <NavLink to='/messages' className={navData => navData.isActive ? s.active : s.item}>Messages</NavLink>
            </div>
            <div>
                <NavLink to='/users' className={navData => navData.isActive ? s.active : s.item}>Users</NavLink>
            </div>
            <div>
                <NavLink to='/news' className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
            </div>
            <div>
                <NavLink to='/music' className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
            </div>
            <div>
                <p><NavLink to='/settings' className={navData => navData.isActive ? s.active : s.item}>Settings</NavLink></p>
            </div>
        </nav>
    );
};

export default Navbar;
