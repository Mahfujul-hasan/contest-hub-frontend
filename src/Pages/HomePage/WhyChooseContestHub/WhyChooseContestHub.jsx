import React from "react";
import { MdVerified, MdCardGiftcard, MdGroups } from "react-icons/md";

const features = [
  {
    title: "Quality Contests",
    description:
      "All contests are verified and curated to ensure legitimacy and fair competition for all participants.",
    icon: <MdVerified size={36} />,
    bg: "bg-secondary/10",
    text: "text-secondary",
  },
  {
    title: "Real Prizes",
    description:
      "Win cash prizes, equipment, software licenses, and recognition from industry leaders.",
    icon: <MdCardGiftcard size={36} />,
    bg: "bg-primary/10",
    text: "text-primary",
  },
  {
    title: "Vibrant Community",
    description:
      "Join thousands of creators, get feedback, and grow your skills with a supportive community.",
    icon: <MdGroups size={36} />,
    bg: "bg-success/10",
    text: "text-success",
  },
];

const WhyChooseContestHub = () => {
  return (
    <section className="py-10 bg-base-100">
      <div>
        {/* HEADER */}
        <h2 className="text-3xl text-primary font-semibold text-center mb-5">
          Why Choose ContestHub?
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-base-200 p-10 rounded-md border border-base-300 text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div
                className={`w-20 h-20 ${item.bg} ${item.text} rounded-2xl flex items-center justify-center mx-auto mb-8`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-base-content mb-4">
                {item.title}
              </h3>

              <p className="text-base-content/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseContestHub;
