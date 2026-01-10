import React from "react";
import { MdAccountBalanceWallet, MdChatBubble, MdShowChart } from "react-icons/md";
import { TbCloudLockOpen } from "react-icons/tb";


const features = [
  {
    title: "Real-time Analytics",
    description:
      "Track performance and engagement metrics as they happen with our deep-dive data visualization dashboard.",
    icon: <MdShowChart className="text-3xl" />,
  },
  {
    title: "Secure File Hosting",
    description:
      "Enterprise-grade encryption for all creative assets, ensuring your intellectual property remains private and protected.",
    icon: <TbCloudLockOpen className="text-3xl" />,
  },
  {
    title: "Integrated Chat",
    description:
      "Seamless communication between organizers and participants to clarify briefs and provide instant feedback.",
    icon: <MdChatBubble className="text-3xl" />,
  },
  {
    title: "Automated Payouts",
    description:
      "Instant, secure prize distribution once a winner is selected, powered by our automated escrow smart system.",
    icon: <MdAccountBalanceWallet className="text-3xl" />,
  },
];

const ToolsFeatures = () => {
  return (
    <section className="py-10 border-t border-base-300 bg-base-100">
      <div>
        {/* Header */}
        <div className="text-center mb-5">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4 uppercase tracking-wider">
            Advanced Ecosystem
          </span>
          <h2 className="text-3xl text-primary font-semibold text-center mb-5">
            Tools & Features
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Empowering both creators and organizers with industry-leading
            platform capabilities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-base-200 p-8 rounded-md shadow-md border border-base-300 hover:-translate-y-1 transition-transform duration-300 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold  mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsFeatures;
