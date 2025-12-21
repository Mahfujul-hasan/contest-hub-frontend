import React, { useEffect } from 'react';
import { Link,  useNavigate,  useSearchParams } from 'react-router';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const[searchParams]=useSearchParams();
    const navigate =useNavigate();

    
    const sessionId=searchParams.get('session_id');
    useEffect(()=>{
        axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res=>{
            if(res.data.success ){
                setTimeout(()=>{
                    navigate(`/contest-details/${res.data.data.contestId
}`)
                },3000)
                
            }
           
            
        })
    },[sessionId,axiosSecure,navigate])

    //payment section
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div>
                <AiOutlineCheckCircle className='text-green-400 mx-auto mb-10' size={120} />
                <h3 className="text-2xl font-bold text-green-500 text-center">payment has been successfully done.</h3>
            </div>
            
        </div>
    );
};

export default PaymentSuccess;