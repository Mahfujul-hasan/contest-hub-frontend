import { useState } from "react";
import { SiTicktick } from "react-icons/si";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";

const ITEMS_PER_PAGE = 4;

const MyParticipatedContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= USER ================= */
  const { data: participant, isLoading: participantLoading } = useQuery({
    queryKey: ["participant", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  /* ================= PARTICIPATIONS ================= */
  const {
    data: participations = [],
    isLoading: participationsLoading,
  } = useQuery({
    queryKey: ["participations", participant?._id],
    enabled: !!participant?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/participations/${participant._id}`
      );
      return res.data;
    },
  });

  if (participantLoading || participationsLoading) {
    return <Spinner />;
  }

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(participations.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, totalPages || 1);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = participations.slice(startIndex, endIndex);

  return (
    <div className="mx-5 mt-5">
      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto rounded-2xl shadow-md bg-base-100">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th className="hidden lg:table-cell">Image</th>
              <th>Contest</th>
              <th className="hidden md:table-cell">Deadline</th>
              <th className="hidden md:table-cell">Entry Fee</th>
              <th>Prize</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((participation) => (
              <tr key={participation._id} className="hover">
                {/* Image */}
                <td className="hidden lg:table-cell">
                  <img
                    src={participation.contestImage}
                    alt="contest"
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </td>

                {/* Contest */}
                <td>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">
                      {participation.contestName}
                    </span>
                    <span className="badge badge-secondary badge-sm w-fit">
                      {participation.contestType}
                    </span>

                    {/* Mobile-only extra info */}
                    <div className="md:hidden text-sm opacity-70 mt-1 space-y-1">
                      <p>
                        Deadline:{" "}
                        {new Date(
                          participation.deadline
                        ).toLocaleDateString()}
                      </p>
                      <p>Entry: {participation.entryPrice} Taka</p>
                    </div>
                  </div>
                </td>

                {/* Deadline */}
                <td className="hidden md:table-cell">
                  {new Date(participation.deadline).toLocaleDateString()}
                </td>

                {/* Entry Fee */}
                <td className="hidden md:table-cell">
                  {participation.entryPrice} Taka
                </td>

                {/* Prize */}
                <td className="font-bold text-accent">
                  {participation.prizeMoney} Taka
                </td>

                {/* Status */}
                <td>
                  <div className="badge badge-success gap-2 font-semibold">
                    <SiTicktick size={16} />
                    {participation.paymentStatus}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {participations.length > ITEMS_PER_PAGE && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 px-2">
          {/* Info */}
          <p className="text-sm opacity-70">
            Showing {startIndex + 1} –{" "}
            {Math.min(endIndex, participations.length)} of{" "}
            {participations.length} results
          </p>

          {/* Controls */}
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                className={`join-item btn btn-sm ${
                  safeCurrentPage === page + 1 ? "btn-primary" : ""
                }`}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            ))}

            <button
              className="join-item btn btn-sm"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParticipatedContests;
