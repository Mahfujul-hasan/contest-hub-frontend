import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hook/useAuth";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";
import { FaChartBar, FaHome } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { BsFillSunFill } from "react-icons/bs";
import ThemeControler from "../../../components/ThemeControler/ThemeControler";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const links = (
    <>
      <li className="text-lg font-semibold">
        <NavLink to="/">
          <FaHome />
          Home
        </NavLink>
      </li>
      <li className="text-lg font-semibold">
        <NavLink to="all-contests">
          <LuGalleryVerticalEnd />
          All Contests
        </NavLink>
      </li>
      <li className="text-lg font-semibold">
        <NavLink to="statistics">
          <FaChartBar />
          Statistics
        </NavLink>
      </li>
      <li className="text-lg font-semibold">
        <NavLink to="resources">
          <IoBookOutline /> Resources
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-base-100 sticky top-0 left-0 right-0 z-10">
      <nav className="navbar max-w-7xl mx-auto ;g:px-10 shadow-sm ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
              <ThemeControler/>
            </ul>
            
          </div>
          <div>
            <Logo></Logo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
          <ThemeControler/>
        </div>
        <div className="navbar-end space-x-3">
          {user ? (
            <>
              <div className="dropdown dropdown-end ">
                <div tabIndex={0}>
                  <Link>
                    <img
                      src={user.photoURL}
                      alt=""
                      className="w-12 h-12 rounded-full border-2 border-primary"
                    />
                  </Link>
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-5 "
                >
                  <li className="">
                    <h3 className="mx-auto text-xl font-bold text-primary hover:bg-transparent">
                      {user.displayName}
                    </h3>
                  </li>

                  <li className="border-b border-info  font-bold text-base">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="mt-3 ">
                    <Link
                      onClick={handleLogout}
                      className="btn border-2 border-primary  text-primary text-base font-bold bg-transparent"
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Link to="/register">
                  <button className="btn text-base font-bold text-primary  border-2 border-primary bg-transparent rounded-3xl">
                    Sign UP
                  </button>
                </Link>
                <Link to="/login">
                  <button className="btn bg-primary text-base text-white font-bold rounded-3xl">
                    Login
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
