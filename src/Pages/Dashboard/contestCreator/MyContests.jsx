import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Link } from "react-router";

const MyContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: contests = [] } = useQuery({
    queryKey: ["contests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${user.email}`);
      return res.data;
    },
  });
  console.log(contests);
  return (
    <div>
      <h3 className="text-3xl font-bold text-purple-500 text-center pt-5">
        My created contests list
      </h3>
      <div className="overflow-x-auto border-2 border-purple-200 rounded-3xl my-5 min-h-screen">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Contest name</th>
              <th>Contest type</th>
              <th>Deadline</th>
              <th>Content status</th>
              <th>Actions</th>
              <th>submission</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest,index) => (
                <tr key={contest._id}>
                  <th>{index+1}</th>
                  <td>{contest.contestName}</td>
                  <td>{contest.contestType}</td>
                  <td>{contest.deadline}</td>
                  <td>{contest.status}</td>
                  <td>
                    {
                    contest.status==="pending"
                    ? <><Link to={`/dashboard/my-contests/${contest._id}`}><button className="btn mr-2">Edit</button></Link>
                    <button className="btn">Delete</button></>
                    :<>
                    <button className="btn mr-2" disabled>Edit</button>
                    <button className="btn" disabled>Delete</button></>
                }
                    
                  </td>
                  <td><Link><button className="btn bg-purple-200 text-purple-700 rounded-full">See submission</button></Link></td>
                </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContests;
