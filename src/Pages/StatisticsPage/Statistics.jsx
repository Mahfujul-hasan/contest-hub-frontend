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
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests/approved");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  const totalContests = contests.length;
  const totalParticipants = contests.reduce(
    (sum, c) => sum + c.participantsCount,
    0
  );
  const totalPrizePool = contests.reduce(
    (sum, c) => sum + parseInt(c.prizeMoney),
    0
  );
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

  const maxPrizeCount = Math.max(...prizeRanges.map((d) => d.count));

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <h3 className="flex items-center justify-center gap-3 text-4xl font-bold text-primary mb-2">
        <FaChartBar /> Contest Analytics
      </h3>
      <p className="text-center text-base-content/70 mb-10">
        Real-time insights into contest performance and participation trends
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <StatCard
          icon={<GrTarget className="text-purple-600" />}
          title="Total Contests"
          value={totalContests}
        />
        <StatCard
          icon={<GoPeople className="text-green-600" />}
          title="Total Participants"
          value={totalParticipants}
        />
        <StatCard
          icon={<TbCoinTaka className="text-blue-600" />}
          title="Total Prize Pool"
          value={
            <div className="flex items-center gap-1">
              {totalPrizePool} <TbCurrencyTaka />
            </div>
          }
        />
        <StatCard
          icon={<FaArrowTrendUp className="text-amber-400" />}
          title="Avg Participation"
          value={avgParticipation}
        />
      </div>

      {/* Prize Distribution */}
      <div className="mt-12 border border-base-200 rounded-3xl p-6 max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold text-center text-primary mb-6">
          Prize Distributions
        </h3>
        <div className="space-y-4">
          {prizeRanges.map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-base-content">{item.range}</span>
                <span className="text-base-content font-semibold">
                  {item.count} contests
                </span>
              </div>
              <div className="h-3 bg-base-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(item.count / maxPrizeCount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value }) => (
  <div className="flex items-center justify-between p-5 border-l-4 border-primary rounded-2xl shadow-md bg-base-200">
    <div className="flex items-center gap-3">
      {icon}{" "}
      <h3 className="text-2xl font-bold text-base-content/70">{title}</h3>
    </div>
    <div className="text-2xl font-bold text-base-content/70">{value}</div>
  </div>
);

export default Statistics;
