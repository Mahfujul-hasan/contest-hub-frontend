import React from "react";
import {
  MdEditNote,
  MdExplore,
  MdMilitaryTech,
  MdOutlineGavel,
} from "react-icons/md";

const steps = [
  {
    step: "01",
    title: "Discover",
    description: "Find contests you love across various creative categories.",
    icon: <MdExplore size={28} />,
  },
  {
    step: "02",
    title: "Join & Create",
    description: "Register and submit your entry according to the guidelines.",
    icon: <MdEditNote size={28} />,
  },
  {
    step: "03",
    title: "Get Judged",
    description: "Industry experts review your work based on quality criteria.",
    icon: <MdOutlineGavel size={28} />,
  },
  {
    step: "04",
    title: "Win & Grow",
    description: "Receive prizes and boost your career recognition.",
    icon: <MdMilitaryTech size={28} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10 bg-base-100">
      <div>
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-3xl text-primary font-semibold text-center mb-4">
            How It Works
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Four simple steps to turn your creativity into career-defining
            achievements.
          </p>
        </div>

        {/* STEPS */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* CONNECTING LINE */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full border-t-2 border-dashed border-base-200 -translate-y-1/2" />

          {steps.map((item) => (
            <div
              key={item.step}
              className="relative z-9 bg-base-200 p-8 rounded-md border border-base-300 text-center flex flex-col items-center"
            >
              <span className="absolute top-4 left-4 text-4xl font-bold text-base-300">
                {item.step}
              </span>

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-linear-to-br from-primary to-secondary text-white">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-base-content mb-2">
                {item.title}
              </h3>

              <p className="text-base-content/70 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
