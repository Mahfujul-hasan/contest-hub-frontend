import React from 'react';
import Banner from '../Banner/Banner';
import PopularContests from '../popularContests/PopularContests';
import WinnerAdvertisement from '../WinnerAdvertisement/WinnerAdvertisement';

const Home = () => {
    return (
        <div className='min-h-screen max-w-7xl mx-auto'>
            <Banner />
            <PopularContests />
            <WinnerAdvertisement />
        </div>
    );
};

export default Home;