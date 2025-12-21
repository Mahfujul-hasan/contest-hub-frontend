import React from "react";
import Countdown from "react-countdown";
import { FaRegClock } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

const DeadlineCountDown = ({ contest }) => {
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="text-center py-6 bg-red-50 rounded-3xl mt-10 flex flex-col items-center justify-center h-60 mx-5">
          <p className="text-3xl font-bold text-red-600">Contest Ended</p>
          <p className="text-gray-600 mt-2">
            Registration and submission are closed
          </p>
        </div>
      );
    }else{
        return(
            <div className="rounded-3xl p-6 mx-5 shadow-lg mt-10 border-2 border-blue-200">
                <h3  className="text-2xl font-bold mb-4 flex items-center justify-center gap-3"><FaRegClock size={24} className="text-red-600" />Time Remaining</h3>
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                    {/* days  */}
                    <div  className="bg-[#225ce5] rounded-lg p-3 md:p-4 text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">{days.toString().padStart(2,'0')}</div>
                        <div className="text-xs md:text-sm text-white/80 mt-1">Days</div>
                    </div>
                    {/* Hours  */}
                    <div  className="bg-[#225ce5] rounded-lg p-3 md:p-4 text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">{hours.toString().padStart(2,'0')}</div>
                        <div className="text-xs md:text-sm text-white/80 mt-1">Hours</div>
                    </div>
                    {/* Minutes  */}
                    <div  className="bg-[#225ce5] rounded-lg p-3 md:p-4 text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">{minutes.toString().padStart(2,'0')}</div>
                        <div className="text-xs md:text-sm text-white/80 mt-1">Minutes</div>
                    </div>
                    {/* Seconds */}
                    <div  className="bg-[#225ce5] rounded-lg p-3 md:p-4 text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">{seconds.toString().padStart(2,'0')}</div>
                        <div className="text-xs md:text-sm text-white/80 mt-1">Seconds</div>
                    </div>
                </div>
                {
                    (days===0 && hours < 24) && 
                    <div className="mt-4 flex justify-center items-center gap-3 text-yellow-500">
                        <IoIosWarning size={24} />
                        <p className=" font-semibold animate-pulse text-xl">Less than 24 hours left</p>
                    </div>
                }
            </div>
        )
    }
};

// const isContestEnded = new Date(contest.deadline)< new Date();

  return (
    <div>
      <Countdown date={new Date(contest.deadline)} renderer={countdownRenderer} />
    </div>
  );
};

export default DeadlineCountDown;
