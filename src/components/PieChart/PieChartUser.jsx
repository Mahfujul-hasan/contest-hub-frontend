import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const PieCartUser = ({loginUser}) => {
    const participated= loginUser.totalParticipations;
    const won= loginUser.totalWins;
    const winingPercentage =((won/participated)*100).toFixed(2)
  const data = [
    { name: "participated", value: participated },
    { name: "won", value: won },
  ];
  const colors=[ "#E5E7EB","#3B82F6"]
  return (
    <div className="flex justify-center">
      <PieChart
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "70vh",
          aspectRatio: 1,
        }}
        responsive
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      >
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          innerRadius="60%"
          outerRadius="80%"
          fill="#82ca9d"
          label
          isAnimationActive={true}
        >
            {
                data.map((entry,index)=><Cell fill={colors[index]} cornerRadius={55}/>)
            }
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#3B82F6"
        >
          {winingPercentage}%
        </text>
      </PieChart>
    </div>
  );
};

export default PieCartUser;
