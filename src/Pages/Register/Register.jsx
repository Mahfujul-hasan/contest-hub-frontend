import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

import SocialLogin from "../../components/socialLogin/SocialLogin";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const password = useWatch({ control, name: "password" });

  const showSuccess = (message) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const showError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: message,
    });
  };

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;

    const res = await axios.post(url, formData);
    return res.data?.data?.image?.url;
  };


  const onSubmit = async (data) => {
    try {
      const imageFile = data.photoURL[0];

      // 1. Create auth user
      await createUser(data.email, data.password);

      // 2. Upload image
      const photoURL = await uploadImage(imageFile);

      // 3. Update Firebase profile
      await updateUserProfile({
        displayName: data.displayName,
        photoURL,
      });

      // 4. Save user in database
      await axiosSecure.post("/users", {
        displayName: data.displayName,
        email: data.email,
        photoURL,
      });

      showSuccess("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      showError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto flex items-center justify-center">
      <div className="p-6 w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <Logo />
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-primary text-center">
          Create an account
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label font-semibold">Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Your name"
              {...register("displayName", { required: "Name is required" })}
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm">
                {errors.displayName.message}
              </p>
            )}

            {/* Email */}
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <label className="label font-semibold">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/,
                  message:
                    "Must include upper, lower, number & special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}

            {/* Confirm Password */}
            <label className="label font-semibold">Confirm Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}

            {/* Photo */}
            <label className="label font-semibold">Profile Photo</label>
            <input
              type="file"
              className="file-input file-input-ghost"
              {...register("photoURL", { required: "Photo is required" })}
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm">
                {errors.photoURL.message}
              </p>
            )}

            {/* Submit */}
            <button className="btn btn-primary w-full mt-1">
              Register
            </button>
          </fieldset>
        </form>

        {/* Login link */}
        <p className="text-center mt-1">
          Already have an account?{" "}
          <Link to="/login" className="link text-primary">
            Login
          </Link>
        </p>

        {/* Social login */}
        <div className="divider">or</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
