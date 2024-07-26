import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiSlumberingSanctuary } from "react-icons/gi";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiBellSimpleRingingFill } from "react-icons/pi";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import Avatar from "../components/Avatar";
import { logout } from "../utils/auth";
import MessageTab from "./MessagingTab";
import "animate.css";

const Sidebar = () => {
  const { users, currentUser, loading, error } = useSelector(
    (state) => state.user
  );

  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);
  const [isMessageTabOpen, setIsMessageTabOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleUsersDropdown = () => {
    setIsUsersDropdownOpen(!isUsersDropdownOpen);
  };

  const handleUserClick = (user) => {
    if (selectedUser && selectedUser._id === user._id) {
      setIsMessageTabOpen(!isMessageTabOpen);
    } else {
      setSelectedUser(user);
      setIsMessageTabOpen(true);
    }
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

  const menuItems = [
    {
      text: "Home",
      icon: <GiSlumberingSanctuary fontSize="large" />,
      link: "/home",
    },
    { text: "Post", icon: <PostAddRoundedIcon />, link: "/post" },
    {
      text: "Messages",
      icon: <TextsmsRoundedIcon fontSize="small" />,
      link: "/messages",
    },
    {
      text: "Users",
      icon: <FaArrowsDownToPeople fontSize="large" />,
      onClick: toggleUsersDropdown,
    },
    {
      text: "Notifications",
      icon: <PiBellSimpleRingingFill fontSize="large" />,
      link: "/notifications",
    },
  ];

  const settingsItems = [
    { text: "Profile", icon: <ManageAccountsIcon />, link: "/profile" },
    {
      text: "Settings",
      icon: <SettingsSuggestRoundedIcon />,
      link: "/settings",
    },
    {
      text: "Logout",
      icon: <RiLogoutCircleLine fontSize="large" />,
      onClick: logout,
    },
  ];

  return (
    <div className="bg-sideBar text-black h-screen px-4 fixed right-0 w-16 md:w-48 flex flex-col justify-between border border-neutral-400">
      <div className="ml-2">
        <ul className="flex flex-col mt-5 text-sm">
          <li
            className="hover:text-foregroundColor flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer animate__animated animate__fadeInRight"
            style={{ animationDelay: "0.3s", animationDuration: "1s" }}
          >
            <Avatar
              src={`http://localhost:3000/${currentUser.avatar}`}
              alt={`${currentUser.firstname}'s avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="hidden md:inline">{currentUser.firstname}</span>
          </li>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <li
                className="group hover:text-foregroundColor flex items-center py-3 px-2 space-x-3 hover:rounded hover:cursor-pointer transform transition-transform duration-200 hover:scale-110 animate__animated animate__fadeInRight"
                style={{
                  animationDelay: `${(index + 2) * 0.3}s`,
                  animationDuration: "1s",
                }}
                onClick={item.onClick}
              >
                {item.link ? (
                  <Link
                    to={item.link}
                    className="flex items-center space-x-3 group no-underline"
                  >
                    {item.icon}
                    <span className="hidden md:inline group-hover:text-indigo-500 no-underline">
                      {item.text}
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-3 group">
                    {item.icon}
                    <span className="hidden md:inline group-hover:text-indigo-500">
                      {item.text}
                    </span>
                    {item.text === "Users" && (
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isUsersDropdownOpen ? "rotate-180" : "rotate-0"
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
                    )}
                  </div>
                )}
              </li>
              {item.text === "Users" && isUsersDropdownOpen && (
                <ul className="pl-8 space-y-2">
                  {users.map((user, userIndex) => (
                    <li
                      key={user._id}
                      onClick={() => handleUserClick(user)}
                      className="cursor-pointer group animate__animated animate__fadeInRight"
                      style={{
                        animationDelay: `${(userIndex + 1) * 0.1}s`,
                        animationDuration: "0.7s",
                      }}
                    >
                      {user.firstname} {user.lastname}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div>
        <ul className="flex flex-col text-sm mb-2 ml-2">
          {settingsItems.map((item, index) => (
            <li
              key={index}
              className="group hover:text-foregroundColor flex items-center py-3 px-2 space-x-5 hover:rounded hover:cursor-pointer transform transition-transform duration-200 hover:scale-105 animate__animated animate__fadeInRight"
              style={{
                animationDelay: `${(menuItems.length + index + 2) * 0.3}s`,
                animationDuration: "1s",
              }}
              onClick={item.onClick}
            >
              {item.link ? (
                <Link
                  to={item.link}
                  className="flex items-center space-x-5 group no-underline"
                >
                  {item.icon}
                  <span className="hidden md:inline group-hover:text-indigo-500 no-underline">
                    {item.text}
                  </span>
                </Link>
              ) : (
                <button className="flex items-center space-x-5 group no-underline">
                  {item.icon}
                  <span className="hidden md:inline group-hover:text-black no-underline">
                    {item.text}
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {isMessageTabOpen && selectedUser && <MessageTab user={selectedUser} />}
    </div>
  );
};

export default Sidebar;
