import React from 'react';
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({children}) => {

    const {user, loading}=useAuth();
    const location = useLocation();
    if(loading){
        return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
    }

    if(!user){
        return <Navigate to="/login" state={location.pathname}/>
    }
    return children;
};

export default PrivateRouter;