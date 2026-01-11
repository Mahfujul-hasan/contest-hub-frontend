import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsCurrencyDollar, BsFillTrophyFill } from "react-icons/bs";
import { PiMedalBold, PiMedalFill, PiMedalLight } from "react-icons/pi";
import { HiOutlineClipboardList } from "react-icons/hi";
import useAuth from "../../hook/useAuth";
import DeadlineCountDown from "../../components/DeadlineCountDown/DeadlineCountDown";
import trophyImg from "../../assets/trophy.png";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner/Spinner";

const ContestDetails = () => {
  const { user, loading } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const submitModalRef = useRef();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: contest, isLoading: contestLoading } = useQuery({
    queryKey: ["contest", id],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data[0];
    },
  });

  const { data: participant, isLoading: participantLoading } = useQuery({
    queryKey: ["participant", user.email],
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: participation = null, isLoading: participationLoading } =
    useQuery({
      queryKey: ["participation", contest?._id, participant?._id],
      enabled: !!contest?._id && !!participant?._id,
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/participations?contestId=${contest._id}&userId=${participant._id}`
        );
        return res.data;
      },
    });

  const {
    data: submission,
    isLoading: submissionLoading,
    refetch: refetchSubmission,
  } = useQuery({
    queryKey: ["submission", participant?._id, id],
    enabled: !!participant?._id && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submissions/user-submission-status?userId=${participant._id}&contestId=${id}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (submissionSuccess) {
      submitModalRef.current?.close();
    }
  }, [submissionSuccess]);

  if (loading || contestLoading) {
    return <Spinner />;
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
    setSubmissionSuccess(true);
    refetchSubmission();
  };
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto bg-base-100 transition-colors duration-500 mb-10">
  {/* Contest Banner */}
  <div className="relative  overflow-hidden shadow-xl">
    <img
      src={contest.contestImage}
      alt={contest.contestName}
      className="w-full h-80 object-cover transform transition-transform duration-500 hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
    <div className="absolute bottom-5 left-6 space-y-2">
      <h3 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">
        {contest.contestName}
      </h3>
      <p className="text-lg md:text-xl font-medium text-white/90">
        Type: {contest.contestType}
      </p>

      <div className="flex flex-wrap items-center gap-4 mt-3">
        <button className="btn btn-sm btn-outline btn-info gap-2 rounded-full text-white hover:bg-info/20 transition">
          <MdOutlinePeopleAlt size={20} />
          {contest.participantsCount} Participants
        </button>
        <button className="btn btn-sm btn-outline btn-success gap-2 rounded-full text-white hover:bg-success/20 transition">
          <BsCurrencyDollar size={20} />
          {contest.entryPrice}
        </button>
      </div>
    </div>
  </div>

  {/* Contest Description */}
  <div className="mt-10 mx-4 lg:mx-10 p-6 rounded-md shadow-md border-l-4 border-primary bg-base-200  transition-colors hover:shadow-lg">
    <h3 className="text-2xl md:text-3xl font-bold flex text-primary items-center gap-2 mb-4">
      <PiMedalBold className="text-primary" size={28} />
      Contest Description
    </h3>
    <p className="text-base md:text-lg font-medium text-base-content/70 leading-relaxed max-w-[90%]">
      {contest.contestDescription}
    </p>
  </div>

  {/* Task Instruction */}
  <div className="mt-10 mx-4 lg:mx-10 p-6 rounded-md shadow-md border-l-4 border-primary bg-base-200  transition-colors hover:shadow-lg">
    <h3 className="text-2xl md:text-3xl font-bold flex text-primary items-center gap-2 mb-4">
      <HiOutlineClipboardList className="text-primary" size={28} />
      Task Instruction
    </h3>
    <p className="text-base md:text-lg font-medium text-base-content/70 leading-relaxed max-w-[90%]">
      {contest.taskInstruction}
    </p>
  </div>

  {/* Prize & Countdown */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-4 lg:mx-10 mb-5 mt-10">
    <div className="p-6 rounded-md shadow-xl bg-linear-to-r from-green-500 to-green-600 text-white flex flex-col justify-center items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
      <img src={trophyImg} className="w-12 mb-4" alt="trophy" />
      <div className="relative mb-2">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full"></div>
        <h3 className="relative z-9 text-xl md:text-2xl font-medium flex items-center gap-2 px-6 py-1 rounded-full">
          Prize Money
        </h3>
      </div>
      <p className="text-5xl md:text-6xl font-bold flex items-center gap-2">
        <BsCurrencyDollar size={50} />
        {contest.prizeMoney}
      </p>
    </div>
    <div>
      <DeadlineCountDown contest={contest} />
    </div>
  </div>

  {/* Winner */}
  {contest.winnerId && (
    <div className="bg-base-200 rounded-md p-10 mx-4 lg:mx-10 mt-5 transition-colors shadow-md hover:shadow-lg">
      <h3 className="text-primary text-4xl md:text-5xl font-bold text-center mb-6">
        Winner Declared
      </h3>
      <div className="flex flex-col items-center">
        <img
          src={contest.winnerPhoto}
          alt={contest.winnerName}
          className="rounded-full border-4 border-primary w-28 h-28 mb-4 shadow-md"
        />
        <h3 className="text-2xl md:text-3xl font-bold text-primary">
          {contest.winnerName}
        </h3>
      </div>
    </div>
  )}

  {/* Registration & Submission */}
  {new Date() < new Date(contest.deadline) && (
    <>
      <div className="mx-4 lg:mx-10 mt-5">
        {participantLoading || participationLoading ? (
          <Spinner />
        ) : (
          <button
            onClick={handlePayment}
            disabled={participation?.paymentStatus === "paid"}
            className={`btn btn-secondary w-full text-white text-2xl md:text-3xl font-bold py-7 rounded-md transition-all duration-300 ${
              participation?.paymentStatus === "paid" && "btn-disabled"
            } hover:bg-primary`}
          >
            {participation?.paymentStatus === "paid"
              ? "Registered"
              : "Register & Pay"}
          </button>
        )}
      </div>

      <div className="mx-4 lg:mx-10 p-5 bg-base-200 rounded-md mt-5 transition-colors shadow-md hover:shadow-lg">
        <ul className="list-disc list-inside space-y-2 text-base-content/70 font-semibold text-base md:text-lg">
          <li>You must register and pay to participate</li>
          <li>Submit your task before the deadline</li>
          <li>Winner will be announced after evaluation</li>
        </ul>
      </div>

      {participation?.paymentStatus === "paid" && (
        <div className="mx-4 lg:mx-10 mt-5">
          {submissionLoading ? (
            <Spinner />
          ) : (
            <button
              onClick={handleSubmitModal}
              disabled={submission}
              className={`btn btn-secondary w-full text-white text-2xl md:text-3xl font-bold py-7 rounded-md transition-all duration-300 ${
                submission && "btn-disabled"
              } hover:bg-primary`}
            >
              Submit Task
            </button>
          )}
          <dialog
            ref={submitModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box p-6 rounded-2xl shadow-xl">
              <form method="dialog">
                <button className="btn btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="mt-5">
                <form onSubmit={handleSubmit(handleSubmission)}>
                  <fieldset className="fieldset space-y-3">
                    <textarea
                      className="textarea textarea-bordered w-full h-32 resize-none"
                      placeholder="Provide necessary links"
                      {...register("submissionLink", {
                        required: "SubmissionLink is required",
                      })}
                    ></textarea>
                    {errors.submissionLink && (
                      <p className="text-red-500 font-bold mt-1">
                        {errors.submissionLink.message}
                      </p>
                    )}
                    <button
                      className="btn btn-primary w-full py-3 text-lg font-semibold hover:scale-105 transition-all"
                      disabled={submission}
                    >
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
