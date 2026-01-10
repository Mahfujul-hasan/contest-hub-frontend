import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ContestCard from "../../../components/ContestCard/ContestCard";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";
import ContestCardSkeleton from "../../../components/Skeleton/CardSkeleton";

const AllContests = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTab, setSelectedTab]=useState("All")
    const{isLoading,data:contests}=useQuery({
        queryKey:["contests"],
        queryFn:async()=>{
            const res= await axiosSecure.get(`/contests/approved`);
            return res.data;
        }
    })

    if(isLoading){
      return <ContestCardSkeleton />
    }

    
    const contestTypes=["All",...new Set(contests.map(contest=>contest.contestType))];
    const filteredContests=selectedTab==="All"?contests:contests.filter(contest=>contest.contestType===selectedTab);

    
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto mt-10 px-4 lg:px-10">
      <h1 className="text-4xl font-bold text-primary text-center">
        All Contest
      </h1>

      <div className="flex justify-center mt-5">
        <div role="tablist" className="tabs tabs-border">
          {
            contestTypes.map(type=><a 
            key={type}
            role="tab" 
            onClick={()=>setSelectedTab(type)}
            className={`tab ${selectedTab===type?"tab-active":""}`}>
            {type}
          </a>)
          }
          
          
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        
        {
          filteredContests.length>0?(filteredContests.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))):<p>no contest has found</p>
        }
      </div>
    </div>
  );
};

export default AllContests;
