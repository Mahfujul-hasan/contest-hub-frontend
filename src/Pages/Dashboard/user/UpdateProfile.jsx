import React from "react";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateUser = (data) => {
    const updatedInfo = {bio:data.bio};
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
  return (
    <div>
      <h3 className=" text-center text-2xl font-bold mt-10">Update Profile</h3>
      <div className="mt-10">
        <img
          src={user.photoURL}
          alt=""
          className="rounded-full mx-auto outline-4 outline-purple-500 w-96 h-96"
        />
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="outline-4 outline-purple-300 rounded-2xl p-5 mt-10"
        >
          <fieldset className="fieldset">
            {/* name  */}
            <label className="label text-base font-bold">Your Name</label>
            <input
              type="text"
              className="input w-full bg-base-200"
              placeholder="Your name"
              defaultValue={user.displayName}
            />

            {/* email */}
            <label className="label text-base font-bold">Your Email</label>
            <input
              type="email"
              className="input w-full bg-base-200"
              placeholder="Email"
              defaultValue={user.email}
            />

            {/* bio  */}
            <label className="label text-base font-bold">Your Bio</label>
            <textarea
              className="textarea w-full bg-base-200"
              placeholder="You can add your biography here....."
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
