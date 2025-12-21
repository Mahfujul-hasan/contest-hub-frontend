import React from "react";
import { Link, Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { RiListCheck2, RiMedal2Fill } from "react-icons/ri";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MdLeaderboard, MdSpaceDashboard } from "react-icons/md";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BsFillPersonFill } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { FaTasks, FaTrophy, FaUsersCog } from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { data: userRole } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-white rounded-2xl shadow-md my-3">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <AiOutlineMenuUnfold size={24} />
            </label>
            <div className="px-4 text-2xl font-bold text-transparent bg-clip-text bg-linear-65 from-indigo-500 via-purple-500 to-pink-500">
              ContestHub Dashboard
            </div>
          </div>
          <div className="navbar-end mx-5">
            <img
              src={user.photoURL}
              alt=""
              className="w-14 h-14 rounded-full border-2 border-primary p-0.5"
            />
          </div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64 rounded-2xl mx-3 shadow-lg ">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <div className="is-drawer-close:hidden">
                <Logo />
              </div>
            </li>

            {/* List item-Home */}
            <li className="mt-5 text-primary">
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <IoHome size={18} />
                <span className="is-drawer-close:hidden text-base font-bold">
                  Homepage
                </span>
              </Link>
            </li>

            {/* List item-dashboard */}
            <li className="mt-5 text-primary">
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                data-tip="Dashboard"
              >
                {/* Dashboard icon */}
                <MdSpaceDashboard size={18} />
                <span className="is-drawer-close:hidden text-base font-bold">
                  Dashboard
                </span>
              </Link>
            </li>

            {userRole === "user" && (
              <>
                {/* List item-My participated contests */}
                <li className="text-primary mt-3">
                  <Link
                    to="/dashboard/my-participated-contests"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                    data-tip="My Participated Contests"
                  >
                    <RiMedal2Fill size={18} />
                    <span className="is-drawer-close:hidden text-base font-bold">
                      My Participated Contests
                    </span>
                  </Link>
                </li>

                {/* List item-My winning contests */}
                <li className="text-primary mt-3">
                  <Link
                    to="/dashboard/my-winnings-contests"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                    data-tip="My winning Contests"
                  >
                    <FaTrophy size={18} />
                    <span className="is-drawer-close:hidden text-base font-bold">
                      My Winning Contests
                    </span>
                  </Link>
                </li>

                {/* List item-My profile */}
                <li className="text-primary mt-3">
                  <Link
                    to="/dashboard/my-profile"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                    data-tip="My Profile"
                  >
                    <BsFillPersonFill size={18} />
                    <span className="is-drawer-close:hidden text-base font-bold">
                      My Profile
                    </span>
                  </Link>
                </li>

                {/* List item-Leaderboard */}
                <li className="text-primary mt-3">
                  <Link
                    to="/dashboard/leaderboard"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                    data-tip="Leaderboard"
                  >
                    
                    <MdLeaderboard size={18} />
                    <span className="is-drawer-close:hidden text-base font-bold">
                      Leaderboard
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* for contest creator role  */}

            {userRole === "creator" && (
              <>
                {/* List item-Add contest */}
                <li className="mt-5 text-primary">
                  <Link
                    to="/dashboard/add-contest"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                    data-tip="Add contest"
                  >
                    {/* Dashboard icon */}
                    <FiPlusCircle size={18} />
                    <span className="is-drawer-close:hidden text-base font-bold">
                      Add Contest
                    </span>
                  </Link>
                </li>

                {/* List item-my contests */}
                <li className="mt-5 text-primary">
                  <Link
                    to="/dashboard/my-contests"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                    data-tip="My contests"
                  >
                    {/* My contests icon */}
                    <RiListCheck2 size={18} />
                    <span className="is-drawer-close:hidden text-base font-bold">
                      My Contests
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* for admin role  */}
            {userRole === "admin" && (
              <>
                {/* List item-contest approve */}
                <li className="mt-5 text-primary">
                  <Link
                    to="/dashboard/contest-management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                    data-tip="Contest management"
                  >
                    {/* contest approve icon */}
                    <FaTasks size={18} />
                    <span className="is-drawer-close:hidden text-base font-bold">
                      Contest management
                    </span>
                  </Link>
                </li>

                {/* List item-user management */}
                <li className="mt-5 text-primary">
                  <Link
                    to="/dashboard/user-management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom tooltip-primary"
                    data-tip="User management"
                  >
                    {/* User management icon icon */}
                    <FaUsersCog size={18} />
                    <span className="is-drawer-close:hidden text-base font-bold">
                      User management
                    </span>
                  </Link>
                </li>
              </>
            )}

           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
