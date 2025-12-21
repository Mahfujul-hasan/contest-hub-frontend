import useAuth from "../../../hook/useAuth";
import { Link } from "react-router";
import { FiEdit } from "react-icons/fi";
import PieCartUser from "../../../components/PieChart/PieChartUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";

const MyProfile = () => {
  const {user} = useAuth();
  
  const axiosSecure=useAxiosSecure()
  const {data:loginUser, isLoading:loginUserLoading}=useQuery({
    queryKey:["users",user?.email],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data
    }
  })
  if(loginUserLoading){
    return <Spinner/>
  }
  
  // console.log(loginUser);
  return (
    <div className="bg-white rounded-2xl shadow-md min-h-screen mt-5 border border-gray-200">
      <div className="p-10 ">
        <div className="flex justify-between ">
        <h3 className="text-2xl font-semibold text-primary">Profile Information</h3>
        <Link to="/dashboard/update-profile"><button  className="btn bg-purple-500 text-white text-lg font-bold rounded-xl flex items-center"><FiEdit />Edit</button></Link>
      </div>
      <div className="mt-10">
        <img src={loginUser.photoURL} alt="" className="rounded-full w-80 h-80 mx-auto outline-4 outline-purple-500" />
        <form className="outline-4 outline-purple-300 rounded-2xl p-5 mt-10">
             <fieldset className="fieldset">

                {/* name  */}
          <label className="label text-base font-bold">Your Name</label>
          <input type="text" className="input w-full bg-base-200" placeholder="Your name" defaultValue={loginUser.displayName} readOnly />

          {/* email */}
          <label className="label text-base font-bold">Your Email</label>
          <input type="email" className="input w-full bg-base-200" placeholder="Email" defaultValue={loginUser.email} readOnly />

          {/* bio  */}
          <label className="label text-base font-bold">Your Bio</label>
          <textarea className="textarea w-full bg-base-200" placeholder="Please add your bio here.." readOnly>{loginUser.bio}</textarea>
          
        </fieldset>
        </form> 
      </div>
      <div className="bg-purple-100 rounded-2xl mt-10">
        <h3 className="text-center text-xl font-semibold text-gray-700 pt-5">Win Percentage</h3>
        <PieCartUser loginUser={loginUser}/>
        <div className="grid grid-cols-2 gap-5 p-5">
            <div className="bg-white rounded-2xl text-center py-10">
                <h3 className="text-2xl font-extrabold text-purple-700">{loginUser.totalParticipations}</h3>
                <p>Total Participated</p>
            </div>
            <div className="bg-white rounded-2xl text-center py-8">
                <h3 className="text-2xl font-extrabold text-green-700">{loginUser.totalWins}</h3>
                <p>Total Won</p>
            </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default MyProfile;
