import React from 'react';
import Banner from '../Banner/Banner';
import PopularContests from '../popularContests/PopularContests';

const Home = () => {
    return (
        <div className='min-h-screen max-w-7xl mx-auto'>
            <Banner />
            <PopularContests />
        </div>
    );
};

export default Home;