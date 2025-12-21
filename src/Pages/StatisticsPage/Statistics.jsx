import React from "react";
import { FaChartBar } from "react-icons/fa";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GrTarget } from "react-icons/gr";
import { TbCoinTaka, TbCurrencyTaka } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import Spinner from "../../components/Spinner/Spinner";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: contests = [],isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests/approved");
      return res.data;
    },
  });
  if(isLoading){
    return <Spinner/>
  }

  const totalContests = contests.length;
  const totalParticipants = contests.reduce(
    (sum, c) => sum + c.participantsCount,
    0
  );
  const totalPrizePool = contests.reduce((sum, c) => sum + parseInt(c.prizeMoney), 0);
  const avgParticipation = (totalParticipants / totalContests).toFixed(1);



  const prizeRanges = [
    { range: "৳ 0-1K", contests: contests.filter((c) => c.prizeMoney < 1000) },
    {
      range: "৳ 1K-2K",
      contests: contests.filter(
        (c) => c.prizeMoney >= 1000 && c.prizeMoney < 2000
      ),
    },
    {
      range: "৳ 2K-3K",
      contests: contests.filter(
        (c) => c.prizeMoney >= 2000 && c.prizeMoney < 3000
      ),
    },
    {
      range: "৳ 3K-4K",
      contests: contests.filter(
        (c) => c.prizeMoney >= 3000 && c.prizeMoney < 4000
      ),
    },
    { range: "৳ 4K+", contests: contests.filter((c) => c.prizeMoney >= 4000) },
  ].map((r) => ({ range: r.range, count: r.contests.length }));

  const maxPrizeCountedContest = Math.max(...prizeRanges.map((d) => d.count));

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <h3 className="flex items-center justify-center gap-5 text-4xl font-bold text-primary mt-10">
        <FaChartBar />
        Contest Analytics
      </h3>
      <p className="text-center text-base text-info-content mt-5">
        Real-time insights into contest performance and participation trends
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-10">
        <div className="flex items-center justify-between px-5 py-5 border-l-4 border-info rounded-2xl shadow-md">
            <div className="flex items-center gap-3"><GrTarget size={24} className="text-purple-600" /> <h3 className="text-2xl font-bold text-black/60">Total Contests</h3></div>
            <div className="text-2xl font-bold text-black/60">{totalContests}</div>
        </div>
        <div className="flex items-center justify-between px-5 py-5 border-l-4 border-info rounded-2xl shadow-md">
            <div className="flex items-center gap-3"><GoPeople size={24} className="text-green-600" /> <h3 className="text-2xl font-bold text-black/60">Total Participants</h3></div>
            <div className="text-2xl font-bold text-black/60">{totalParticipants}</div>
        </div>
        <div className="flex items-center justify-between px-5 py-5 border-l-4 border-info rounded-2xl shadow-md">
            <div className="flex items-center gap-3"><TbCoinTaka size={24} className="text-blue-600" /> <h3 className="text-2xl font-bold text-black/60">Total Prize Pool</h3></div>
            <div className="text-2xl font-bold flex items-center gap-3 text-black/60">{totalPrizePool}<TbCurrencyTaka /></div>
        </div>
        <div className="flex items-center justify-between px-5 py-5 border-l-4 border-info rounded-2xl shadow-md">
            <div className="flex items-center gap-3"><FaArrowTrendUp size={24} className="text-amber-300" /> <h3 className="text-2xl font-bold text-black/60">Avg Participation</h3></div>
            <div className="text-2xl font-bold text-black/60">{avgParticipation}</div>
        </div>
      </div>

      <div className="my-10 border-2 border-info rounded-3xl max-w-4xl mx-auto py-5 px-10">
        <h3 className="text-3xl font-semibold text-info text-center">
          Prize distributions
        </h3>
        <div className="space-y-4 ">
          {prizeRanges.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-black">{item.range}</span>
                <span className="text-black font-semibold">
                  {item.count} contests
                </span>
              </div>
              <div className="h-3 bg-black/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-green-600 to-emerald-400 rounded-full transition-all"
                  style={{
                    width: `${(item.count / maxPrizeCountedContest) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
