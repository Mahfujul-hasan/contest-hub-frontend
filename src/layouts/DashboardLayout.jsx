import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { IoHome } from "react-icons/io5";
import { RiListCheck2, RiMedal2Fill } from "react-icons/ri";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MdLeaderboard, MdSpaceDashboard } from "react-icons/md";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BsFillPersonFill } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { FaTasks, FaTrophy, FaUsersCog } from "react-icons/fa";
import ThemeControler from "../components/ThemeControler/ThemeControler";
import Logo from "../components/Logo/Logo";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
    enabled: !!user?.email,
  });

  const { data: loginUser } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto text-base-content">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar bg-base-100 shadow my-3 border-b-2 border-base-200 sticky top-0 left-0 right-0 z-10">
          <div className="navbar-start space-x-5">
            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
              <AiOutlineMenuUnfold size={24} />
            </label>

            <Logo />
          </div>

          {user && loginUser && (
            <div className="navbar-end mx-5 space-x-5">
              <div>
                <ThemeControler />
              </div>
              <img
                src={loginUser.photoURL}
                alt="profile"
                className="w-14 h-14 rounded-full border-2 border-primary p-0.5"
              />
            </div>
          )}
        </nav>

        <Outlet />
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="flex min-h-full flex-col bg-base-100 rounded-md mx-3 shadow-lg is-drawer-close:w-14 is-drawer-open:w-64 border-r-2 border-base-200">
          <ul className="menu w-full grow">
            <li>
              <div className="is-drawer-close:hidden">
                <Logo />
              </div>
            </li>

            <li className="mt-5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `tooltip tooltip-primary ${isActive ? "text-primary" : ""}`
                }
                data-tip="Homepage"
              >
                <IoHome size={18} />
                <span className="is-drawer-close:hidden font-bold">
                  Homepage
                </span>
              </NavLink>
            </li>

            <li className="mt-3">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `tooltip tooltip-primary ${isActive ? "text-primary" : ""}`
                }
                data-tip="Dashboard"
              >
                <MdSpaceDashboard size={18} />
                <span className="is-drawer-close:hidden font-bold">
                  Dashboard
                </span>
              </NavLink>
            </li>

            {userRole === "user" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-participated-contests"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    <RiMedal2Fill size={18} />
                    <span className="is-drawer-close:hidden font-bold">
                      My Participated Contests
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-winnings-contests"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    <FaTrophy size={18} />
                    <span className="is-drawer-close:hidden font-bold">
                      My Winning Contests
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-profile"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    <BsFillPersonFill size={18} />
                    <span className="is-drawer-close:hidden font-bold">
                      My Profile
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/leaderboard"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    <MdLeaderboard size={18} />
                    <span className="is-drawer-close:hidden font-bold">
                      Leaderboard
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {userRole === "creator" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/add-contest"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    <FiPlusCircle size={18} />
                    <span className="is-drawer-close:hidden font-bold">
                      Add Contest
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-contests"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    <RiListCheck2 size={18} />
                    <span className="is-drawer-close:hidden font-bold">
                      My Contests
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {userRole === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/contest-management"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    <FaTasks size={18} />
                    <span className="is-drawer-close:hidden font-bold">
                      Contest Management
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/user-management"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    <FaUsersCog size={18} />
                    <span className="is-drawer-close:hidden font-bold">
                      User Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
