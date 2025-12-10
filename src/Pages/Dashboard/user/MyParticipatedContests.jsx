import { SiTicktick } from "react-icons/si";
import useAuth from "../../../hook/useAuth";
import { FiCalendar } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";

const MyParticipatedContests = () => {
    const{user}=useAuth()
  return (
    <div className=" mx-5 space-y-5 mt-5">
      <div className="rounded-2xl p-3 grid grid-cols-1 lg:grid-cols-4 items-center  bg-white border-b-4 border-purple-500 shadow-md">
        <div className="col-span-1 hidden lg:block">
            <img src={user.photoURL} alt="" className="rounded-2xl lg:w-20 " />
        </div>
        {/* card div  */}
        <div className=" col-span-2">
            {/* name and type  */}
            <div className=" flex items-center gap-10">
                <h3 className="text-2xl font-semibold text-gray-700">Contest name</h3>
                <span className="px-3 py-0.5 rounded-full text-sm font-semibold bg-purple-200 text-purple-700 ">contest type</span>
            </div>
            {/* sub card  */}
            <div className="flex justify-between mt-3">
                {/* time and entry  */}
                <div className="text-gray-500">
                    <p className="flex items-center gap-2"><FiCalendar />Deadline: 17/5/25</p>
                    <p className="flex items-center gap-2"><BsCurrencyDollar />entry fee</p>
                </div>
                {/* prize  */}
                <div>
                    <p className="flex items-center gap-3 text-gray-500 font-bold"><GoTrophy className="text-accent" size={26} />prize: 500$</p>
                </div>
            </div>
        </div>
        {/* status div */}
        <div className=" flex items-center justify-center">
            <div className="flex lg:flex-col gap-2 font-bold items-center text-green-400"><SiTicktick size={32} />paid</div>
        </div>
      </div>
    </div>
  );
};

export default MyParticipatedContests;
