import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { PiMedalBold, PiMedalFill, PiMedalLight } from "react-icons/pi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { GoTrophy } from "react-icons/go";
import useAuth from "../../hook/useAuth";

const ContestDetails = () => {
  const {user}=useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: contest, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data[0];
    },
  });

  const { data: participant} = useQuery({
    queryKey: ["participant", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <p>loaidng...</p>;
  }

  const handlePayment=async()=>{
    const paymentInfo={
      contestId:contest._id,
      contestName:contest.contestName,
      contestType:contest.contestType,
      participantId:participant._id,
      participantName:participant.displayName,
      participantEmail:participant.email,
      participantPhoto:participant.photoURL,
      deadline:contest.deadline,
      entryPrice:contest.entryPrice,
    }

    const res = await axiosSecure.post('/create-checkout-session',paymentInfo);
    // console.log(res.data.url);
    window.location.href=res.data.url
    console.log(paymentInfo);
  }
  return (
    <div className="min-h-screen max-w-7xl mx-auto ">
      <div className="relative">
        <img src={contest.contestImage} alt="" className="w-full h-80 " />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent "></div>
        <div className="absolute bottom-3 left-5 space-y-3">
          <h3 className="text-white text-3xl font-bold">
            {contest.contestName}
          </h3>
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-3 btn rounded-full bg-white/40 border-none text-white text-lg font-medium">
              <MdOutlinePeopleAlt size={25} />
              {contest.participantsCount} Participants
            </button>
            <button className="flex items-center gap-2 btn rounded-full bg-white/40 border-none text-white text-lg font-medium">
              <BsCurrencyDollar size={25} />
              {contest.entryPrice}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 mx-5 p-5 rounded-3xl shadow-lg border-l-4 border-l-purple-500 ">
        <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
          <PiMedalBold className="text-blue-600" size={25} />
          Contest Description
        </h3>
        <p className="text-base font-medium max-w-[90%] text-gray-500">
          {contest.contestDescription}
        </p>
      </div>

      <div className="mt-10 mx-5 p-5 rounded-3xl shadow-lg border-l-4 border-l-purple-500 ">
        <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
          <HiOutlineClipboardList className="text-blue-600" size={25} />
          Task Instruction
        </h3>
        <p className="text-base font-medium max-w-[90%] text-gray-500">
          {contest.taskInstruction}
        </p>
      </div>

      <div className="mt-10 mx-5 p-5 rounded-3xl shadow-lg bg-[#168d42] text-white ">
        <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
          <GoTrophy className="text-white" size={25} />
          Prize Money
        </h3>
        <p className="text-4xl font-bold flex items-center">
          <BsCurrencyDollar size={25} />
          {contest.prizeMoney}
        </p>
      </div>
      <div className="mx-5 mt-5">
        <Link>
          <button onClick={handlePayment} className="btn bg-blue-500 w-full text-white text-2xl font-bold py-7 rounded-2xl">
            Register &Pay
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default ContestDetails;
