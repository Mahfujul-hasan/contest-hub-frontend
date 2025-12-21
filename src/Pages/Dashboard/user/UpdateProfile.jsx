import React from "react";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

      const {data:loginUser, isLoading:loginUserLoading}=useQuery({
    queryKey:["users",user?.email],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data
    }
  })

  const handleUpdateUser = async(data) => {
  
    const userImg=data.photoURL[0]
        const formData = new FormData();
        formData.append("image",userImg);
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`
        const res= await axios.post(url,formData)
        const photoURL=res.data.data.image.url;
        
    const updatedInfo = {
      bio:data.bio,
      photoURL:photoURL,
      displayName:data.displayName
    };
   
    axiosSecure.patch(`/users/${user.email}`, updatedInfo).then((res) => {
        
      if (res.data.modifiedCount) {
        navigate('/dashboard/my-profile')
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your profile has been updated!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    
  };

  if(loginUserLoading){
    return <p>loading</p>
  }
  return (
    <div>
      <h3 className=" text-center text-2xl font-bold mt-10">Update Profile</h3>
      <div className="mt-10">
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="outline-4 outline-purple-300 rounded-2xl p-5 mt-10"
        >
          <fieldset className="fieldset">
            <label className="label text-base font-bold">Update your Photo</label>
            <input
              type="file"
              className="file-input file-input-ghost"
              {...register("photoURL", { required: "Photo is required" })}
            />

            {/* name  */}
            <label className="label text-base font-bold">Your Name</label>
            <input
              type="text"
              className="input w-full bg-base-200"
              placeholder="Your name"
              defaultValue={loginUser.displayName}
              {...register("displayName", { required: "display name is required" })}
            />
            {errors.displayName && (
              <p className="text-red-500 font-bold">{errors.displayName.message}</p>
            )}

            {/* email */}
            <label className="label text-base font-bold">Your Email</label>
            <input
              type="email"
              className="input w-full bg-base-200"
              placeholder="Email"
              defaultValue={user.email}
              readOnly
            />

            {/* bio  */}
            <label className="label text-base font-bold">Your Bio</label>
            <textarea
              className="textarea w-full bg-base-200"
              placeholder="You can add your biography here....."
              defaultValue={loginUser.bio}
              {...register("bio", { required: "Bio is required" })}
            ></textarea>
            {errors.bio && (
              <p className="text-red-500 font-bold">Bio is required</p>
            )}
            <button className="btn bg-purple-500 text-white rounded-full mt-4">
              Update Profile
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
