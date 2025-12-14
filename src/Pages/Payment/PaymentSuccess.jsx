import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hook/useAxiosSecure';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const[searchParams]=useSearchParams();
    
    const sessionId=searchParams.get('session_id');
    useEffect(()=>{
        axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data);
        })
    },[sessionId,axiosSecure])
    console.log(sessionId);
    return (
        <div>
            payment has been successfully done.
        </div>
    );
};

export default PaymentSuccess;