import React from 'react';
import { HashLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <HashLoader color="purple" size={100} />
        </div>
    );
};

export default Spinner;