import { useForm } from "react-hook-form";
import webLogo from "../../assets/contestHubLogo.png";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../components/socialLogin/SocialLogin";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    loginUser(data.email, data.password).then((res) => {
      console.log(res.user);
      navigate(location.state || "/");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your are successfully logged in!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
      <div className="bg-secondary h-full flex items-center">
        <img src={webLogo} alt="" />
      </div>
      <div className="p-5  w-[90%] mx-auto">
        <h3 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-5 text-primary text-center">
          Login with contestHub
        </h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email  */}
            <label className="label text-base font-semibold text-black">
              Your Email
            </label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-400 font-medium">{errors.email.message}</p>
            )}

            {/* password  */}
            <label className="label text-base font-semibold text-black">
              Enter Password
            </label>
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
                    "Password must include upper, lower, number & special character and at least 6 characters.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 font-medium">
                {errors.password.message}
              </p>
            )}

            {/* forgot password  */}
            <div>
              <Link className="underline text-primary font-bold">
                Forget password?
              </Link>
            </div>

            {/* login button  */}
            <button className="btn btn-primary mt-4">Login</button>
          </fieldset>
        </form>
        <p className="text-center mt-5">
          Haven't any account? please{" "}
          <Link to="/register" className="link text-primary">
            Register
          </Link>
        </p>
        <div className="divider">or</div>
        <div className="w-full">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
