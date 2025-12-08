import React from "react";

const Banner = () => {
  return (
    <div className=" rounded-2xl bg-linear-65 from-indigo-500 via-purple-500 to-pink-500 py-10 space-y-5 mt-10">
      <h3 className="text-4xl font-bold text-white text-center">
        Discover & Host Amazing <br />
        Creative Contests
      </h3>
      <p className="text-white/90 text-center text-base">
        Join logo, writing, business idea, gaming review and photography
        contests - or create your own. Find opportunities compete, and get
        rewarded
      </p>
      <form className="flex justify-center items-center">
        <label className="input input-neutral bg-white/10  border border-r-0 border-white/20 text-white rounded-none rounded-l-2xl">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="Search" className="text-white" />
      </label>
      <button className="btn bg-white/50 text-white border-none rounded-none rounded-r-2xl">Search</button>
      </form>
    </div>
  );
};

export default Banner;
