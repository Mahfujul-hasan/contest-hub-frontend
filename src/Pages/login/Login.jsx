import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import SocialLogin from "../../components/socialLogin/SocialLogin";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../hook/useAuth";

const DEMO_CREDENTIALS = {
  admin: {
    email: "sirat78@gmail.com",
    password: "Sirat#123",
  },
  creator: {
    email: "mahfujulsirat00@gmail.com",
    password: "Sirat#123",
  },
  user: {
    email: "nabil.khan.dev@gmail.com",
    password: "Sirat#123",
  },
};

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSuccessLogin = (message) => {
    navigate(location.state || "/");
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      handleSuccessLogin("You are successfully logged in!");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password",
      });
    }
  };

  const handleDemoLogin = async (role) => {
    const demoUser = DEMO_CREDENTIALS[role];
    if (!demoUser) return;

    setValue("email", demoUser.email);
    setValue("password", demoUser.password);

    try {
      await loginUser(demoUser.email, demoUser.password);
      handleSuccessLogin(`${role.toUpperCase()} demo login successful!`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Demo Login Failed",
        text: `${error.code}.Please try again`,
      });
    }
  };

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto flex items-center justify-center">
      <div className="p-6 w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Heading */}
        <h3 className="text-2xl md:text-4xl font-semibold mb-3 text-primary text-center">
          Login with ContestHub
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label font-semibold">Your Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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

            {/* Forgot password */}
            <div className="text-right">
              <Link className="text-primary font-semibold underline">
                Forget password?
              </Link>
            </div>

            {/* Login Button */}
            <button className="btn btn-primary w-full mt-3">
              Login
            </button>
          </fieldset>
        </form>

        {/* Register */}
        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="link text-primary">
            Register
          </Link>
        </p>

        {/* Social login */}
        <div className="divider">or</div>
        <SocialLogin />

        {/* Demo Login */}
        <div className="mt-6">
          <p className="text-center font-semibold text-gray-600 mb-3">
            Demo Login
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="btn btn-outline btn-error"
            >
              Admin
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("creator")}
              className="btn btn-outline btn-warning"
            >
              Creator
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("user")}
              className="btn btn-outline btn-success"
            >
              User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
