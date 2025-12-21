import React from "react";
import Logo from "../../../components/Logo/Logo";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
   <footer className="footer footer-horizontal footer-center bg-blue-50  p-10">
  <aside>
    <Logo/>
    <p className="font-bold max-w-4xl">
      ContestHub is a modern platform where users can easily create, explore, and join creative contests. It offers a smooth, secure, and responsive experience for all user roles. The goal is to make contest participation simple, engaging, and enjoyable.
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a href="https://x.com/">
        <FaXTwitter size={20} />
      </a>
      <a href="https://www.youtube.com/">
        <FaYoutube size={20} />
      </a>
      <a href="https://www.facebook.com/">
        <FaFacebookF size={20} />
      </a>
    </div>
  </nav>
</footer>
  );
};

export default Footer;
