import React from 'react';
import useRole from '../hook/useRole';
import useAuth from '../hook/useAuth';
import { useNavigate } from 'react-router';
import Spinner from '../components/Spinner/Spinner';

const CreatorRouter = ({children}) => {
    const{userRole,roleLoading}=useRole();
    const {loading:userLoading,logOut}=useAuth();
    const navigate =useNavigate();
    if(userLoading || roleLoading){
        return <Spinner/>;
    
    }

    if(userRole !== "creator"){
        logOut()
        .then()
        .catch()
        navigate('/login')
    }
    return children
};

export default CreatorRouter;