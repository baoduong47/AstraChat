import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Avatar from "../components/Avatar";
import { logout } from "../utils/auth";

const Sidebar = () => {
  const { users, currentUser, loading, error } = useSelector(
    (state) => state.user
  );

  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);

  const toggleUsersDropdown = () => {
    setIsUsersDropdownOpen(!isUsersDropdownOpen);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!currentUser) {
    return <p>User not found</p>;
  }

  return (
    <div className="bg-sideBar text-white h-screen px-4 fixed right-0 w-16 md:w-52 border-l border-gray-700 flex flex-col justify-between ">
      <div className="ml-2">
        <ul className="flex flex-col mt-5 text-sm ">
          <li className="hover:text-hoverColor flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer  ">
            <Avatar
              src={`http://localhost:3000/${currentUser.avatar}`}
              alt={`${currentUser.firstname}'s avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="hidden md:inline">{currentUser.firstname}</span>
          </li>
          <li className="hover:text-hoverColor flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Link to="/home" className="flex items-center space-x-3">
              <HomeRoundedIcon />
              <span className="hidden md:inline">Home</span>
            </Link>
          </li>
          <li className="hover:text-hoverColor flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Link to="/post" className="flex items-center space-x-3">
              <PostAddRoundedIcon />
              <span className="hidden md:inline">Post</span>
            </Link>
          </li>
          <li className="hover:text-hoverColor flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Link to="/messages" className="flex items-center space-x-3">
              <TextsmsRoundedIcon />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </li>
          <li
            className="hover:text-hoverColor flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer"
            onClick={toggleUsersDropdown}
          >
            <PeopleAltRoundedIcon />
            <span className="hidden md:inline">Users</span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isUsersDropdownOpen ? "rotate-360" : "rotate-180"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          {isUsersDropdownOpen && (
            <ul className="space-y-2">
              {users.map((item) => (
                <li key={item._id}>
                  {item.firstname} {item.lastname}
                </li>
              ))}
            </ul>
          )}
          <li className=" hover:text-hoverColor flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Link to="/notifications" className="flex items-center space-x-3">
              <NotificationsActiveRoundedIcon />
              <span className="hidden md:inline">Notifications</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className=" flex flex-col text-sm mb-2 ml-2">
          <li className="hover:text-hoverColor flex items-center py-3 px-2 space-x-5 hover:rounded hover:cursor-pointer">
            <Link to="/profile" className="flex items-center space-x-5">
              <ManageAccountsIcon />
              <span className="hidden md:inline">Profile</span>
            </Link>
          </li>
          <li className="hover:text-hoverColor flex items-center py-3 px-2 space-x-5 hover:rounded hover:cursor-pointer">
            <Link to="/settings" className="flex items-center space-x-5">
              <SettingsSuggestRoundedIcon />
              <span className="hidden md:inline">Settings</span>
            </Link>
          </li>
          <li className="hover:text-hoverColor flex items-center py-3 px-2 space-x-5 hover:rounded hover:cursor-pointer">
            <button onClick={logout} className="flex items-center space-x-5">
              <LogoutRoundedIcon fontSize="medium" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
