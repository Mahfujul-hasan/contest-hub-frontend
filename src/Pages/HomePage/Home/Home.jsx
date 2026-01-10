import React from 'react';
import Banner from '../Banner/Banner';
import PopularContests from '../popularContests/PopularContests';
import WinnerAdvertisement from '../WinnerAdvertisement/WinnerAdvertisement';
import WhyChooseContestHub from '../WhyChooseContestHub/WhyChooseContestHub';
import Category from '../Category/Category';
import HowItWorks from '../HowItWorks/HowItWorks';
import ToolsFeatures from '../ToolsFeatures/ToolsFeatures';

const Home = () => {
    return (
        <div className='min-h-screen max-w-[1440px] mx-auto mt-10 px-4 lg:px-10'>
            <Banner />
            <Category/>
            <PopularContests />
            <HowItWorks/>
            <ToolsFeatures/>
            <WinnerAdvertisement />
            <WhyChooseContestHub/>
        </div>
    );
};

export default Home;