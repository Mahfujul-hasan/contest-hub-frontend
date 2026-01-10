import React from "react";
import Logo from "../../../components/Logo/Logo";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-base-200 py-10 max-w-[1440px] mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* LOGO */}
        <div className="flex items-center justify-center gap-3 mb-8">
            <Logo />

          
        </div>

        {/* DESCRIPTION */}
        <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
          ContestHub is a modern platform where users can easily create, explore,
          and join creative contests. It offers a smooth, secure, and responsive
          experience for all user roles.
        </p>

        {/* SOCIAL LINKS */}
        <div className="flex justify-center gap-8 mb-12">
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-brand-purple transition-colors"
          >
            <FaXTwitter size={22} />
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-brand-purple transition-colors"
          >
            <FaYoutube size={22} />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-brand-purple transition-colors"
          >
            <FaFacebookF size={22} />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-brand-purple transition-colors"
          >
            <FaLinkedinIn size={22} />
          </a>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 text-sm text-slate-400">
          © {new Date().getFullYear()} ContestHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
