import React from "react";
import { MdPeople } from "react-icons/md";

const ContestCard = ({ contest }) => {
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure>
        <img
          src={contest.image}
          alt="Shoes"
          className="m-2 w-full rounded-lg"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between">
            <h2 className="card-title">
          {contest.name}
        </h2>
        <div className="badge badge-soft badge-primary text-base font-bold"><MdPeople />{contest.participantsCount}</div>
        </div>
        <p>
          {contest.description}
        </p>
        <div className="card-actions">
          <div className="badge badge-info font-bold text-lg text-white py-5 w-full">Details Button</div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
