import React from 'react';
import webLogo from '../../assets/contestHubLogo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
        <img src={webLogo} alt=""  className='w-[200px]'/>
        </Link>
    );
};

export default Logo;