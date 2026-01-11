import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import Spinner from "../../../components/Spinner/Spinner";

const ContestManagement = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: contests,
    isLoading: contestLoading,
    refetch,
  } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });
  if (contestLoading) {
    return <Spinner/>
  }
  const handleContestManagement = (contest, status) => {
    const contestStatusInfo = {
      status: status,
    };
    axiosSecure
      .patch(`/contests/${contest._id}/status`, contestStatusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `${contest.contestName} is marked as ${status}`,
            icon: "success",
          });
        }
      });
  };

  const handleContestApprove = (contest) => {
    handleContestManagement(contest, "approved");
  };
  const handleContestReject = (contest) => {
    handleContestManagement(contest, "rejected");
  };
  const handleContestDelete = (contest) => {
    Swal.fire({
      title: "Are you agree to delete this contest?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`contests/${contest._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your contest has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center text-secondary">
        Manage All Contests
      </h3>
      <div className="overflow-x-auto border-2 border-purple-200 rounded-3xl my-5 min-h-screen">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Contest image</th>
              <th>Contest Name</th>
              <th>Contest Type</th>
              <th>Contest Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>
                  {" "}
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={contest.contestImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{contest.contestName}</td>
                <td>{contest.contestType}</td>
                <td>{contest.status}</td>
                <td className="flex flex-col md:flex-row lg:flex-row gap-2 lg:gap-5">
                  <button
                    onClick={() => handleContestApprove(contest)}
                    className="btn rounded-full bg-green-200 text-green-700"
                  >
                    <FaCheckCircle /> Approve
                  </button>
                  <button
                    onClick={() => handleContestReject(contest)}
                    className="btn rounded-full bg-purple-200 text-purple-700"
                  >
                    <FaTimesCircle /> Reject
                  </button>
                  <button
                    onClick={() => handleContestDelete(contest)}
                    className="btn rounded-full bg-blue-200 text-blue-700"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestManagement;
