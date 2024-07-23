import React from "react";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Avatar from "../components/Avatar";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);

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
    <div className="bg-gray-950 text-white h-screen px-4 fixed right-0 w-16 md:w-52 border-l border-gray-700 flex flex-col justify-between">
      <div className="ml-2">
        <h1 className="text-2xl font-bold hidden md:block mt-4 text-center italic">
          BuzzBoard
        </h1>
        <ul className="flex flex-col mt-10 text-sm">
          <li className="flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Avatar
              src={`http://localhost:3000/${currentUser.avatar}`}
              alt={`${currentUser.firstname}'s avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="hidden md:inline">{currentUser.firstname}</span>
          </li>
          <li className="flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Link to="/home" className="flex items-center space-x-3">
              <HomeRoundedIcon />
              <span className="hidden md:inline">Home</span>
            </Link>
          </li>
          <li className="flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Link to="/post" className="flex items-center space-x-3">
              <PostAddRoundedIcon />
              <span className="hidden md:inline">Post</span>
            </Link>
          </li>
          <li className="flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Link to="/messages" className="flex items-center space-x-3">
              <EmailRoundedIcon />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </li>
          <li className="flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Link to="/friends" className="flex items-center space-x-3">
              <PeopleAltRoundedIcon />
              <span className="hidden md:inline">Users</span>
            </Link>
          </li>
          <li className="flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer">
            <Link to="/notifications" className="flex items-center space-x-3">
              <NotificationsActiveRoundedIcon />
              <span className="hidden md:inline">Notifications</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col text-sm mb-2 ml-2">
          <li className="flex items-center py-3 px-2 space-x-5 hover:rounded hover:cursor-pointer">
            <Link to="/profile" className="flex items-center space-x-5">
              <ManageAccountsIcon />
              <span className="hidden md:inline">Profile</span>
            </Link>
          </li>
          <li className="flex items-center py-3 px-2 space-x-5 hover:rounded hover:cursor-pointer">
            <Link to="/settings" className="flex items-center space-x-5">
              <SettingsSuggestRoundedIcon />
              <span className="hidden md:inline">Settings</span>
            </Link>
          </li>
          <li className="flex items-center py-3 px-2 space-x-5 hover:rounded hover:cursor-pointer">
            <LogoutRoundedIcon fontSize="medium" />
            <span className="hidden md:inline">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
