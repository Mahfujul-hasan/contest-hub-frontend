import React from "react";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { FiCalendar } from "react-icons/fi";
import { PiMedalFill } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Spinner from "../../components/Spinner/Spinner";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1️⃣ Fetch user role
  const { data: userRole, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role; // 'user' or 'admin'
    },
    enabled: !!user?.email,
  });

  const {data:participant, isLoading:participantLoading}=useQuery({
    queryKey:["participant",user?.email],
    queryFn: async()=>{
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data
    }
  })

  // 2️⃣ Fetch user participations
  const { data: participations = [], isLoading: participationsLoading } =
    useQuery({
      queryKey: ["participations", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/participations/${user.email}`);
        return Array.isArray(res.data) ? res.data : [];
      },
      enabled: !!user?.email,
    });

  if (roleLoading || participationsLoading ) return <Spinner />;

  // If user is normal
  if (userRole === "user") {
    // Summary stats
    const totalParticipations = participant.totalParticipations;
    const totalWins = participant.totalWins;
    const winRate = totalParticipations
      ? ((totalWins / totalParticipations) * 100).toFixed(2)
      : 0;

    // 1️⃣ Participation Over Time
    const dateMap = {};
    participations.forEach((p) => {
      const date = p.participatedAt?.$date
        ? new Date(p.participatedAt.$date).toLocaleDateString()
        : new Date(p.participatedAt).toLocaleDateString();
      dateMap[date] = (dateMap[date] || 0) + 1;
    });
    const participationData = Object.entries(dateMap).map(([date, count]) => ({
      date,
      participations: count,
    }));

    // 2️⃣ Prize Money Per Contest
    const prizeData = participations.map((p) => ({
      contest: p.contestName,
      prize: p.prizeMoney,
    }));

    // 3️⃣ Participation By Contest Type
    const typeMap = {};
    participations.forEach((p) => {
      typeMap[p.contestType] = (typeMap[p.contestType] || 0) + 1;
    });
    const pieData = Object.keys(typeMap).map((type) => ({
      name: type,
      value: typeMap[type],
    }));
    const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

    return (
      <div className="p-4">
        {/* Summary Cards */}
        {
          participantLoading? <spinner /> :<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 mx-2 ">
          <div className="flex items-center justify-between border-l-4 border-purple-500 px-5 py-3 rounded-lg shadow-md bg-base-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-500">
                Participated
              </h3>
              <h2 className="text-3xl font-bold">{totalParticipations}</h2>
            </div>
            <FiCalendar className="text-purple-500" size={40} />
          </div>

          <div className="flex items-center justify-between border-l-4 border-green-400 px-5 py-3 rounded-lg shadow-md bg-base-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-500">Won</h3>
              <h2 className="text-3xl font-bold">{totalWins}</h2>
            </div>
            <PiMedalFill className="text-green-400" size={40} />
          </div>

          <div className="flex items-center justify-between border-l-4 border-blue-500 px-5 py-3 rounded-lg shadow-md bg-base-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-500">Win Rate</h3>
              <h2 className="text-3xl font-bold">{winRate}%</h2>
            </div>
            <HiTrendingUp className="text-blue-500" size={40} />
          </div>
        </div>
        }

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <div className="p-4 bg-base-200 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">
              Participation Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="participations"
                  stroke="#4BC0C0"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-base-200 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">
              Prize Money Per Contest
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prizeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="contest" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="prize" fill="#36A2EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-base-200 rounded-lg shadow-md lg:col-span-2">
            <h3 className="text-lg font-semibold mb-3">
              Participation By Contest Type
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard placeholder
  if (userRole === "admin") {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="mt-4">
          Admin view: you can add all users’ participation stats, charts, and
          controls here.
        </p>
      </div>
    );
  }
  if (userRole === "creator") {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">Creator Dashboard</h2>
        <p className="mt-4">
          Creator view: you can add all users' participation stats, charts, and
          controls here.
        </p>
      </div>
    );
  }

  return null;
};

export default Dashboard;
