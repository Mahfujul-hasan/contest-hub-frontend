import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ContestCard from "../../../components/ContestCard/ContestCard";

const AllContests = () => {
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axios.get("/contest.json");
      return res.data;
    },
  });
  if (isLoading) {
    return <p>loaidng...</p>;
  }
  return (
    <div className="min-h-screen mt-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-primary text-center">
        All Contest
      </h1>

      <div className="flex justify-center mt-5">
        <div role="tablist" className="tabs tabs-border">
          <a role="tab" className="tab">
            Tab 1
          </a>
          <a role="tab" className="tab tab-active">
            Tab 2
          </a>
          <a role="tab" className="tab">
            Tab 3
          </a>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {contests.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </div>
  );
};

export default AllContests;
