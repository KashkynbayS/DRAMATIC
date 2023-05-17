import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';
import Input from '../input/Input'

import logo from '../../assets/DRAMATIC.png';
import gift from '../../assets/gift.png';
import bell from '../../assets/bell.png';
import ellipse1 from '../../assets/Ellipse1.png';
import ellipse2 from '../../assets/Ellipse2.png';


const headerNav = [
    {
        display: 'HOME',
        path: '/'
    },
    {
        display: 'TV SHOW',
        path: '/tv'
    },
    {
        display: 'MOVIES',
        path: '/movie'
    },
    {
        display: 'NEW',
        path: '/'
    }
];

const Header = () => {

    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">

                <div className='header__block__child'>
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/"></Link>
                    </div>

                    <ul className="header__nav">
                        {
                            headerNav.map((e, i) => (
                                <li key={i} className={`${i === active ? 'active' : ''}`}>
                                    <Link to={e.path}>
                                        {e.display}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className='header__block__child'>
                    <Input type="text" placeholder="SEARCH" />

                    <ul className="header__nav header__nav__profile">
                        <li><a href=""><img src={gift} alt="" /></a></li>
                        <li><a href=""><img src={bell} alt="" /></a></li>
                        <li><a href=""><img src={ellipse1} alt="" /> <img className='active-profile-label' src={ellipse2} alt="" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
