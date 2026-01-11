import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";

const Leaderboard = () => {
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  if (usersLoading) {
    return <Spinner />;
  }

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl sm:text-3xl font-bold text-primary text-center pt-5">
        Users Leaderboard
      </h3>

      <div className="overflow-x-auto border-2 border-purple-200 rounded-3xl my-5 min-h-[50vh]">
        <table className="table table-zebra w-full min-w-[600px]">
          {/* Head */}
          <thead>
            <tr className="text-sm sm:text-base">
              <th className="text-center">Position</th>
              <th className="text-center">User Image</th>
              <th className="text-center">User Name</th>
              <th className="text-center hidden sm:table-cell">User Email</th>
              <th className="text-center">Total Wins</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id} className="text-sm sm:text-base">
                <th className="text-center">{startIndex + index + 1}</th>
                <td className="text-center">
                  <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                      <img src={user.photoURL} alt={user.displayName} />
                    </div>
                  </div>
                </td>
                <td className="text-center">{user.displayName}</td>
                <td className="text-center hidden sm:table-cell">
                  {user.email}
                </td>
                <td className="text-center">{user.totalWins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center gap-2 my-6">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`btn btn-sm ${
              currentPage === page + 1 ? "btn-primary" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
