import React from 'react';
import useAuth from '../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { MdShowChart } from 'react-icons/md';
import { HiTrendingUp } from 'react-icons/hi';
import { FiCalendar } from 'react-icons/fi';
import { PiMedalFill } from 'react-icons/pi';

const Dashboard = () => {
    const{user}=useAuth();
    const axiosSecure= useAxiosSecure();
    const {data:userRole, isLoading}=useQuery({
        queryKey:["users",user.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            return res.data.role
            
        }
    })
    if(isLoading){
        return <p>loading..</p>
    }

    console.log(userRole);
    return (
        <div>
            {
                userRole==="user"
                && 
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 mx-2'>
                    
                    <div className='flex items-center justify-between border-l-4 border-purple-500 px-5 py-3 rounded-lg shadow-md'>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-500'>Participated</h3>
                            <h2 className='text-3xl font-bold'>12</h2>
                        </div>
                        <FiCalendar  className='text-purple-500' size={40} />
                    </div>

                    <div className='flex items-center justify-between border-l-4 border-green-400 px-5 py-3 rounded-lg shadow-md'>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-500'>Won</h3>
                            <h2 className='text-3xl font-bold'>3</h2>
                        </div>
                        <PiMedalFill className='text-green-400' size={40} />
                    </div>

                    <div className='flex items-center justify-between border-l-4 border-blue-500 px-5 py-3 rounded-lg shadow-md'>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-500'>Win Rate</h3>
                            <h2 className='text-3xl font-bold'>25%</h2>
                        </div>
                        <HiTrendingUp className='text-blue-500' size={40} />
                    </div>

                    
                    
                </div>
                
                
            }
        </div>
    );
};

export default Dashboard;