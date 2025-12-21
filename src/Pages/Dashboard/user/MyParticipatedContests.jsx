import { SiTicktick } from "react-icons/si";
import useAuth from "../../../hook/useAuth";
import { FiCalendar } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";

const MyParticipatedContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data:participant, isLoading:participantLoading}=useQuery({
    queryKey:["participant",user.email],
    queryFn:async()=>{
      const res = await axiosSecure.get(`/users/${user.email}`)
      return res.data 
    }
  })
  const { data: participations=[], isLoading:participationsLoading } = useQuery({
    queryKey: ["participations", participant],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participations/${participant._id}`);
      return res.data;
    },
  });
  if(participantLoading|| participationsLoading ){
    return <Spinner/>
  }

  return (
    <div className=" mx-5 space-y-5 mt-5">
      {participations.map((participation) => (
        <div key={participation._id} className="rounded-2xl p-3 grid grid-cols-1 lg:grid-cols-4 items-center  bg-white border-b-4 border-purple-500 shadow-md">
          <div className="col-span-1 hidden lg:block">
            <img
              src={participation.contestImage}
              alt=""
              className="rounded-2xl lg:w-25 lg:h-25 "
            />
          </div>
          {/* card div  */}
          <div className=" col-span-2">
            {/* name and type  */}
            <div className=" flex items-center gap-10">
              <h3 className="text-2xl font-semibold text-gray-700">
                {participation.contestName}
              </h3>
              <span className="px-3 py-0.5 rounded-full text-sm font-semibold bg-purple-200 text-purple-700 ">
                {participation.contestType}
              </span>
            </div>
            {/* sub card  */}
            <div className="flex justify-between mt-3">
              {/* time and entry  */}
              <div className="text-gray-500">
                <p className="flex items-center gap-2">
                  <FiCalendar />
                  Deadline: {new Date(participation.deadline).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <BsCurrencyDollar />
                  {participation.entryPrice} Taka
                </p>
              </div>
              {/* prize  */}
              <div>
                <p className="flex items-center gap-3 text-gray-500 font-bold">
                  <GoTrophy className="text-accent" size={26} />
                  prize: {participation.prizeMoney} Taka
                </p>
              </div>
            </div>
          </div>
          {/* status div */}
          <div className=" flex items-center justify-center">
            <div className="flex lg:flex-col gap-2 font-bold items-center text-green-400">
              <SiTicktick size={32} />
              {participation.paymentStatus}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyParticipatedContests;
