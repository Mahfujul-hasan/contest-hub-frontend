import React from "react";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";
import { HiTrophy } from "react-icons/hi2";

const MyWinningContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: currentUser, isLoading: currentUserLoading } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  const { data: winningContests = [], isLoading: winningContestsLoading } =
    useQuery({
      queryKey: ["contests", currentUser],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/contests/winner/${currentUser._id}`
        );
        return res.data;
      },
    });

  if (currentUserLoading || winningContestsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h3 className="text-3xl font-bold text-purple-500 text-center pt-5">
        My winning contests list
      </h3>
      <div className="overflow-x-auto border-2 border-purple-200 rounded-3xl my-5 min-h-screen">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Contest Image</th>
              <th>Contest name</th>
              <th>Contest type</th>
              <th>Winner Name</th>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>
            {winningContests.map((contest, index) => (
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
                <td>{contest.winnerName}</td>
                <td><div className="flex items-center gap-2"><HiTrophy className="text-amber-300" size={20} />{contest.prizeMoney} Taka</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWinningContests;
