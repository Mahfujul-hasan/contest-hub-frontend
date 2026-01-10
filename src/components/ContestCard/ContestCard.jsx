import React from "react";
import { MdPeople } from "react-icons/md";
import { Link } from "react-router";

const ContestCard = ({ contest }) => {
  return (
    <div className="card bg-base-200 shadow-xl rounded-md overflow-hidden">
      
      {/* IMAGE */}
      <figure className="h-40 overflow-hidden">
        <img
          src={contest.contestImage}
          alt={contest.contestName}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* BODY */}
      <div className="p-2 space-y-2 gap-4">
        
        {/* TITLE + BADGE */}
        <div className="flex items-start justify-between mt-2">
          <h2 className="card-title text-base-content text-base font-semibold">
            {contest.contestName}
          </h2>

          <div className="badge badge-outline badge-primary gap-1">
            <MdPeople className="text-lg" />
            {contest.participantsCount}
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-base-content/70">
          {contest.contestDescription.slice(0, 40)}{" "}
          <Link
            to={`/contest-details/${contest._id}`}
            className="text-primary font-medium"
          >
            read more...
          </Link>
        </p>

        {/* BUTTON */}
        <div className="card-actions">
          <Link to={`/contest-details/${contest._id}`} className="w-full">
            <button className="btn btn-primary w-full rounded-md text-white">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
