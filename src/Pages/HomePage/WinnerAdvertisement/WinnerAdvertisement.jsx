import React from "react";
import { GiMoneyStack } from "react-icons/gi";
import Spinner from "../../../components/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { HiTrophy } from "react-icons/hi2";
import { BsTrophyFill } from "react-icons/bs";
import { FaMoneyBills } from "react-icons/fa6";

const WinnerAdvertisement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: winners = [], isLoading: winnersLoading } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners");
      return res.data;
    },
  });

  if (winnersLoading) {
    return <Spinner />;
  }

  return (
    <section className="py-10 bg-base-100">
      <div className="text-center">
        <h2 className="text-3xl text-primary font-semibold text-center mb-4">Recent Winners</h2>
        <p className="text-gray-500 mb-5">
          Congratulations to the champions of our latest contests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {winners.map((winner) => (
            <div
              key={winner._id}
              className="bg-base-200 p-6 rounded-md shadow-lg border border-base-300 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -mr-8 -mt-8 rounded-full"></div>

              {/* Winner Photo */}
              <img
                src={winner.winnerPhoto}
                alt={winner.winnerName}
                className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white ring-4 ring-primary/20 object-cover"
              />

              {/* Winner Name */}
              <h3 className="text-xl font-bold text-primary mb-6 capitalize">
                {winner.winnerName}
              </h3>

              {/* Contest Info */}
              <div className="relative pt-6 border-t border-base-300">
                {/* Trophy Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-md">
                  <BsTrophyFill size={24} />
                </div>

                {/* Contest Type */}
                <p className="text-gray-500 text-sm mb-2">
                  {winner.contestType}
                </p>

                {/* Prize Money */}
                <p className="text-primary font-bold text-lg flex items-center justify-center gap-2">
                  <FaMoneyBills className="text-primary" /> {winner.prizeMoney}{" "}
                  Taka
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisement;
