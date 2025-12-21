import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";
import { FaRegClock } from "react-icons/fa";
import { Link } from "react-router";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: searchedContests=[] } = useQuery({
    queryKey: ["contests", searchQuery],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests/approved?searchQuery=${searchQuery}`
      );
      return res.data;
    },
    enabled: searchQuery.trim().length > 0
  });

  return (
    <div className=" rounded-2xl bg-linear-65 from-indigo-500 via-purple-500 to-pink-500 mx-auto py-10 mt-10">
      <h3 className="text-4xl font-bold text-white text-center my-5">
        Discover & Host Amazing <br />
        Creative Contests
      </h3>
      <p className="text-white/90 text-center text-base my-5">
        Join logo, writing, business idea, gaming review and photography
        contests - or create your own. Find opportunities compete, and get
        rewarded
      </p>
      <div className="flex items-center justify-center mt-5">
        <label className={`input input-neutral bg-white border border-white text-black/80 rounded-2xl ${searchedContests.length>0&&"rounded-b-none"}  w-3xl mx-5`}>
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            value={searchQuery}
            placeholder="Search by contest type"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-black/80"
          />
        </label>
      </div>
      
      <div className="flex justify-center">
        {searchedContests.length > 0 &&
          <div className="bg-white px-5 mt-0 mx-5 border-t border-gray-200 max-h-52 overflow-y-auto w-3xl z-10 rounded-3xl rounded-t-none">
            {searchedContests.map((contest) => (
              <div className="flex justify-between items-center text-black/60">
                <div className="flex items-center gap-3">
                  <FaRegClock size={16}/>
                  <h3>{contest.contestName}</h3>
                </div>
                <Link to={`/contest-details/${contest._id}`}>
                  <button className=" text-base  py-5 cursor-pointer">
                    Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};


export default Banner;
