import React from 'react';
import webLogo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className='flex gap-3 items-center'>
        <img src={webLogo} alt=""  className='w-10'/>
        <h3 className='text-2xl font-semibold text-secondary'>Contest <span className='text-accent'>Hub</span></h3>
        </Link>
    );
};

export default Logo;