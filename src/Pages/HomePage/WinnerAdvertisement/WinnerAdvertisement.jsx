import React from 'react';
import trophyImg from '../../../assets/trophy.png';
import { GiMoneyStack } from 'react-icons/gi';
import Spinner from '../../../components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const WinnerAdvertisement = () => {

    const axiosSecure=useAxiosSecure()

    const {data:winners=[], isLoading:winnersLoading}=useQuery({
        queryKey:["winners"],
        queryFn:async()=>{
            const res =await axiosSecure.get('/winners')
            return res.data
        }
    })
    
    if(winnersLoading){
        return <Spinner/>
    }
    return (
        <div className=' text-center my-10 mx-auto'>
            <h3 className='text-5xl font-bold mt-10 text-primary'>Recent Winners</h3>
            <p className='text-gray-500 mt-3'>congratulations to the champions of our latest contests.</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 mx-auto'>

                {
                    winners.map(winner=><div key={winner._id} className='max-w-96 flex flex-col items-center p-5 rounded-lg shadow-xl'>
                    <figure>
                        <img src={winner.winnerPhoto} alt=""  className='w-25 h-25 rounded-full border-2 border-green-500' />
                    </figure>
                    <h3 className='text-2xl font-bold text-primary mt-2'>{winner.winnerName}</h3>
                    <div className='border-2 border-accent w-full py-5 px-3 flex flex-col items-center relative mt-7 rounded-lg'>
                        <img src={trophyImg} alt="" className='w-12 absolute -top-5'/>
                        <div className='divider divider-accent  mt-8'>{winner.contestType}</div>
                        <h3 className='flex items-center gap-3 text-lg font-bold text-primary'><GiMoneyStack className='text-blue-500'/> {winner.prizeMoney} Taka</h3>
                    </div>

                </div>)
                }
                {/* card-1  */}
                
                
            </div>
            
        </div>
    );
};

export default WinnerAdvertisement;