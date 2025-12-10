import React from 'react';
import useAuth from '../../../hook/useAuth';
import trophyImg from '../../../assets/trophy.png';
import { GiMoneyStack } from 'react-icons/gi';

const WinnerAdvertisement = () => {
    const {user}=useAuth();
    if(!user){
        return <p>loading---</p>

    }
    return (
        <div className=' text-center my-10'>
            <h3 className='text-5xl font-bold mt-10 text-primary'>Recent Winners</h3>
            <p className='text-gray-500 mt-3'>congratulations to the champions of our latest contests.</p>

            <div className='grid grid-cols-3 mt-10'>
                {/* card-1  */}
                <div className='w-96 flex flex-col items-center p-5 rounded-lg shadow-xl'>
                    <figure>
                        <img src={user.photoURL} alt=""  className='w-20 rounded-2xl' />
                    </figure>
                    <h3 className='text-2xl font-bold text-primary mt-2'>{user.displayName}</h3>
                    <div className='border-2 border-accent w-full py-5 px-3 flex flex-col items-center relative mt-7 rounded-lg'>
                        <img src={trophyImg} alt="" className='w-12 absolute -top-5'/>
                        <div className='divider divider-accent  mt-8'>Contest type</div>
                        <h3 className='flex items-center gap-3 text-lg font-bold text-primary'><GiMoneyStack className='text-blue-500'/> 50000 Taka</h3>
                    </div>

                </div>
                {/* card-2  */}
                <div className='w-96 flex flex-col items-center p-5 rounded-lg shadow-xl'>
                    <figure>
                        <img src={user.photoURL} alt=""  className='w-20 rounded-2xl' />
                    </figure>
                    <h3 className='text-2xl font-bold text-primary mt-2'>{user.displayName}</h3>
                    <div className='border-2 border-accent w-full py-5 px-3 flex flex-col items-center relative mt-7 rounded-lg'>
                        <img src={trophyImg} alt="" className='w-12 absolute -top-5'/>
                        <div className='divider divider-accent  mt-8'>Contest type</div>
                        <h3 className='flex items-center gap-3 text-lg font-bold text-primary'><GiMoneyStack className='text-blue-500'/> 50000 Taka</h3>
                    </div>

                </div>
                {/* card-3  */}
                <div className='w-96 flex flex-col items-center p-5 rounded-lg shadow-xl'>
                    <figure>
                        <img src={user.photoURL} alt=""  className='w-20 rounded-2xl' />
                    </figure>
                    <h3 className='text-2xl font-bold text-primary mt-2'>{user.displayName}</h3>
                    <div className='border-2 border-accent w-full py-5 px-3 flex flex-col items-center relative mt-7 rounded-lg'>
                        <img src={trophyImg} alt="" className='w-12 absolute -top-5'/>
                        <div className='divider divider-accent  mt-8'>Contest type</div>
                        <h3 className='flex items-center gap-3 text-lg font-bold text-primary'><GiMoneyStack className='text-blue-500'/> 50000 Taka</h3>
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default WinnerAdvertisement;