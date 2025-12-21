import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsCurrencyDollar, BsFillTrophyFill } from "react-icons/bs";
import { PiMedalBold, PiMedalFill, PiMedalLight } from "react-icons/pi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { GoTrophy } from "react-icons/go";
import useAuth from "../../hook/useAuth";
import DeadlineCountDown from "../../components/DeadlineCountDown/DeadlineCountDown";
import trophyImg from "../../assets/trophy.png";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner/Spinner";

const ContestDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const submitModalRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: contest, isLoading: contestLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data[0];
    },
  });

  const { data: participant, isLoading: participantLoading } = useQuery({
    queryKey: ["participant", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: participation=null, isLoading: participationLoading } = useQuery({
    queryKey: ["participation", contest?._id, participant?._id],
    enabled: !!contest?._id && !!participant?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/participations?contestId=${contest._id}&userId=${participant._id}`
      );
      return res.data;
    },
  });

 
  const {data:submission, isLoading:submissionLoading}=useQuery({
    queryKey:["submission",participant?._id,id],
    queryFn:async()=>{
      const res = await axiosSecure.get(`/submissions/user-submission-status?userId=${participant._id}&contestId=${id}`)
      return res.data
    }
  })
  
  if (contestLoading || participantLoading || participationLoading||submissionLoading) {
    return <Spinner/>;
  }

  const handlePayment = async () => {
    const paymentInfo = {
      contestId: contest._id,
      contestName: contest.contestName,
      contestType: contest.contestType,
      contestImage: contest.contestImage,
      participantId: participant._id,
      participantName: participant.displayName,
      participantEmail: participant.email,
      participantPhoto: participant.photoURL,
      deadline: contest.deadline,
      entryPrice: contest.entryPrice,
      prizeMoney: contest.prizeMoney,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  const handleSubmitModal = () => {
    submitModalRef.current.showModal();
  };

  const handleSubmission = (data) => {
    const submissionInfo = {
      participationId: participation._id,
      contestId: contest._id,
      contestName: contest.contestName,
      contestDeadline: contest.deadline,
      userId: participant._id,
      userName: participant.displayName,
      userEmail: participant.email,
      userPhoto: participant.photoURL,
      submissionLink: data.submissionLink,
      submittedAt: new Date(),
      isWinner: "pending",
    };
    axiosSecure.post("/submissions", submissionInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    reset();
  };
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

      <div className="grid grid-cols-1 lg:grid-cols-2 mb-5">
        <div className="mt-10 mx-5 p-5 rounded-3xl shadow-lg bg-[#168d42] text-white flex flex-col justify-center items-center ">
          <img src={trophyImg} className=" w-12 mb-5" alt="" />

          <div className="relative mb-2">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full"></div>
            <h3 className="relative z-10 text-xl font-medium flex items-center gap-2 rounded-full px-5 py-1">
              Prize Money
            </h3>
          </div>
          <p className="text-5xl font-bold flex items-center">
            <BsCurrencyDollar size={50} />
            {contest.prizeMoney}
          </p>
        </div>
        <div>
          <DeadlineCountDown contest={contest} />
        </div>
      </div>

      {
        contest.winnerId && <div className="bg-purple-100 rounded-3xl p-10 mx-5">
          <h3 className="text-primary text-4xl font-bold text-center">Winner declared of the contest</h3>
          <div className="flex flex-col items-center">
            <img src={contest.winnerPhoto} alt="" className="rounded-full border-2 border-purple-700 w-28 h-28" />
            <h3 className="text-2xl font-bold text-purple-700">{contest.winnerName}</h3>
          </div>
        </div>
      }

      {new Date() < new Date(contest.deadline) && (
        <>
          <div className="mx-5 mt-5">
            <button
              onClick={handlePayment}
              disabled={participation?.paymentStatus === "paid"}
              className={`btn ${
                participation?.paymentStatus === "paid"
                  ? "bg-gray-500"
                  : "bg-blue-500 cursor-pointer"
              }  w-full text-white text-2xl font-bold py-7 rounded-2xl`}
            >
              {participation?.paymentStatus === "paid"
                ? "Registered"
                : "Register & Pay"}
            </button>
          </div>
          <div className="mx-5 p-5 bg-blue-50 rounded-3xl mt-5">
            <ul className="list-disc list-inside">
              <li className="marker:text-blue-500 text-gray-800 text-base font-semibold">
                You must register and pay to participate
              </li>
              <li className="marker:text-blue-500 text-gray-800 text-base font-semibold">
                Submit your task before the deadline
              </li>
              <li className="marker:text-blue-500 text-gray-800 text-base font-semibold">
                Winner will be announced after evaluation
              </li>
            </ul>
          </div>
          {participation?.paymentStatus === "paid" && (
            <div className="mx-5 mt-5">
              <button
                onClick={handleSubmitModal}
                disabled={submission}
                className={`btn ${submission?"bg-gray-500":"bg-blue-500"} w-full text-white text-2xl font-bold py-7 rounded-2xl`}
              >
                submit task
              </button>
              <dialog
                ref={submitModalRef}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <div className="mt-5">
                    <form onSubmit={handleSubmit(handleSubmission)}>
                      <fieldset className="fieldset">
                        <textarea
                          className="textarea border w-full"
                          placeholder="Provide necessary links"
                          {...register("submissionLink", {
                            required: "SubmissionLink is required",
                          })}
                        ></textarea>
                        {errors.submissionLink && (
                          <p className="text-red-500 font-bold">
                            {errors.submissionLink.message}
                          </p>
                        )}
                        <button className="btn bg-[#225ce5] text-white text-lg font-semibold" disabled={submission}>
                          Submit
                        </button>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContestDetails;
