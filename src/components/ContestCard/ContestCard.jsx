import React from "react";
import { MdPeople } from "react-icons/md";
import { Link } from "react-router";

const ContestCard = ({ contest }) => {
  
  return (
    <div className="card bg-base-100  shadow-lg p-3">
      <figure>
        <img
          src={contest.contestImage}
          alt="Shoes"
          className=" w-full rounded-lg h-72"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{contest.contestName}</h2>
          <div className="badge badge-soft badge-primary text-base font-bold">
            <MdPeople />
            {contest.participantsCount}
          </div>
        </div>
        <p className="text-base">{contest.contestDescription.slice(0, 100)} <Link to={`/contest-details/${contest._id}`}><span className="font-bold">read more...</span></Link></p>
        <div className="card-actions">
          <div className="w-full">
            <Link to={`/contest-details/${contest._id}`}>
              <button className="badge badge-info font-bold text-lg text-white py-5 cursor-pointer w-full">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
