import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import ContestCard from "../../../components/ContestCard/ContestCard";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import ContestCardSkeleton from "../../../components/Skeleton/CardSkeleton";

const AllContests = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");

  const ITEMS_PER_PAGE = 8;

  const { isLoading, data: contests = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests/approved");
      return res.data;
    },
  });

  const contestTypes = useMemo(() => {
    return ["All", ...new Set(contests.map(c => c.contestType))];
  }, [contests]);

  const filteredAndSortedContests = useMemo(() => {
    let filtered =
      selectedTab === "All"
        ? contests
        : contests.filter(c => c.contestType === selectedTab);

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [contests, selectedTab, sortOrder]);

  const totalPages = Math.ceil(
    filteredAndSortedContests.length / ITEMS_PER_PAGE
  );

  const paginatedContests = filteredAndSortedContests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return <ContestCardSkeleton />;
  }

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto mt-10 px-4 lg:px-10">
      <h1 className="text-4xl font-bold text-primary text-center">
        All Contest
      </h1>
      
      {/* Sorting */}
      <div className="flex justify-end mt-5">
        <select
          className="select select-bordered w-52"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>


      {/* Tabs */}
      <div className="flex justify-center mt-5">
        <div role="tablist" className="tabs tabs-border">
          {contestTypes.map(type => (
            <a
              key={type}
              role="tab"
              onClick={() => {
                setSelectedTab(type);
                setCurrentPage(1);
              }}
              className={`tab ${
                selectedTab === type ? "tab-active" : ""
              }`}
            >
              {type}
            </a>
          ))}
        </div>
      </div>

      

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        {paginatedContests.length > 0 ? (
          paginatedContests.map(contest => (
            <ContestCard key={contest._id} contest={contest} />
          ))
        ) : (
          <p>No contest found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllContests;
