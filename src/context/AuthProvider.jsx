import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);
    const googleProvider=new GoogleAuthProvider();
    
    // create user 
    const createUser= (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login user 
    const loginUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // login with google
    const googleLogin=()=>{
        return signInWithPopup(auth, googleProvider)
    }

    // update user
    const updateUserProfile=(profile)=>{
        return updateProfile(auth.currentUser, profile)
    }


    // logOut
    const logOut=()=>{
        setLoading(true)
        localStorage.removeItem("accessToken")
        return signOut(auth)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,async(currentUser)=>{
            setUser(currentUser)
            setLoading(false)

            if(currentUser?.email){
               try {
                 const res=await axios.post("http://localhost:3000/jwt",{
                    email:currentUser.email,
                });
                
                localStorage.setItem("accessToken", res.data.accessToken);
                
               } catch (error) {
                console.log(error);
                
               }
            }else{
                localStorage.removeItem("accessToken")
            }

        });
        return ()=>{
            unsubscribe();
        }
    },[])

    const authInfo={
        createUser,
        loginUser,
        googleLogin,
        updateUserProfile,
        logOut,
        user,
        loading,

    }

    
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;