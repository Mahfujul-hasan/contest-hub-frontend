import React from 'react';
import { BsPeople } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import { GoGift } from 'react-icons/go';

const WhyChooseContestHub = () => {
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h3 className='text-center text-4xl font-bold text-primary '>Why Choose ContestHub?</h3>
            <div className='mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 mx-5'>
                <div className='flex flex-col items-center shadow-lg bg-white rounded-2xl p-10 space-y-5'>
                    <div className='bg-linear-to-br from-purple-500 to-pink-500 text-white p-5 rounded-full'>

                    <FaRegStar size={40} />
                    </div>
                    <h3 className='text-xl font-bold'>Quality Contests</h3>
                    <p className='text-black/60 text-center'>All contests are verified and curated to ensure legitimacy and fair competition for all participants.</p>
                </div>
                <div className='flex flex-col items-center shadow-lg bg-white rounded-2xl p-10 space-y-5'>
                    <div className='bg-linear-to-br from-blue-500 to-cyan-500 text-white p-5 rounded-full'>

                    <GoGift  size={40} />
                    </div>
                    <h3 className='text-xl font-bold'>Real Prizes</h3>
                    <p className='text-black/60 text-center'>Win cash prizes, equipment, software licenses, and recognition from industry leaders.</p>
                </div>
                <div className='flex flex-col items-center shadow-lg bg-white rounded-2xl p-10 space-y-5'>
                    <div className='bg-linear-to-br from-green-500 to-emerald-500 text-white p-5 rounded-full'>

                    <BsPeople size={40} />
                    </div>
                    <h3 className='text-xl font-bold'>Vibrant Community</h3>
                    <p className='text-black/60 text-center'>Join thousands of creators, get feedback, and grow your skills with a supportive community.</p>
                </div>
            </div>
            
        </div>
    );
};

export default WhyChooseContestHub;