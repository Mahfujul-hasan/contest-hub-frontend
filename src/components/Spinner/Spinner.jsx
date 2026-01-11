import React from 'react';
import logo from '../../assets/logo.png'

const Spinner = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <img src={logo} alt="loading...." className='w-24 h-24 animate-spin' />
        </div>
    );
};

export default Spinner;