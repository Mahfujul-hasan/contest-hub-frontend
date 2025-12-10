import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";

const SocialLogin = () => {
    const {googleLogin} =useAuth();
    const navigate = useNavigate();
    const location =useLocation();

    const handleGoogleSignIn=()=>{
        googleLogin()
        .then(()=>{
            navigate(location.state || "/")
        })
    }
  return (
    <Link>
      {/* Google */}
      <button onClick={handleGoogleSignIn} className="btn bg-white w-full text-black border-[#e5e5e5] hover:border-primary">
        <FcGoogle />
        Login with Google
      </button>
    </Link>
  );
};

export default SocialLogin;
