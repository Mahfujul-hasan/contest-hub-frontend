import React from "react";
import webLogo from "../../assets/contestHubLogo.png";
import { useForm, useWatch, Watch } from "react-hook-form";

const Register = () => {
    const {register, handleSubmit, formState:{errors}, control}=useForm();
    const passwordValue = useWatch({control,name:"password"})
    const handleRegister= data=>{
        console.log(data);
    }
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto grid grid-cols-2 items-center">
      <div className="bg-secondary h-full flex items-center">
        <img src={webLogo} alt="" />
      </div>
      <div className="p-5">
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">

            {/* name  */}
            <label className="label">Name</label>
            <input type="text" className="input" placeholder="Name" {...register("name",{required:"Name is required"})} />
            {errors.name && <p className="text-red-400 font-medium">{errors.name.message}</p>}

            {/* email  */}
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" {...register("email",{required:"Email is required"})} />
            {errors.email && <p className="text-red-400 font-medium">{errors.email.message}</p>}

            {/* password  */}
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" {...register("password",{required:"Password is required",pattern:{
                value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/,
                message: "Password must include upper, lower, number & special character and at least 6 characters."
            }})} />
            {errors.password && <p className="text-red-400 font-medium">{errors.password.message}</p>}

            {/* confirm password  */}
            <label className="label">Confirm password</label>
            <input type="password" className="input" placeholder="Confirm password" {...register("confirmPassword",{required:"Confirm your password", validate:(value)=>value === passwordValue || "Password do not match"})} />
            {errors.confirmPassword&& <p className="text-red-400 font-medium">{errors.confirmPassword.message}</p>}

            <label className="label">Confirm password</label>
            <input type="file" className="file-input file-input-ghost" />

            {/* register button  */}
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
