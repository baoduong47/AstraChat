import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiBellSimpleRingingFill } from "react-icons/pi";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import { ImHome } from "react-icons/im";
import { GiTiedScroll } from "react-icons/gi";
import Avatar from "../components/Avatar";
import PostNotification from "./PostNotification";
import { logout } from "../utils/auth";
import MessageTab from "./MessagingTab";
import AllMessagesTab from "./AllMessagesTab";
import {
  getUnreadMessagesCount,
  getUnreadMessagesCounts,
  clearMessages,
} from "../redux/actions/messageActions";

import "animate.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { users, currentUser, loading, error } = useSelector(
    (state) => state.user
  );

  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);
  const [isMessageTabOpen, setIsMessageTabOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAllMessagesTabOpen, setIsAllMessagesTabOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNotificationHovered, setIsNotificationHovered] = useState(false);
  const [notifications, setNotifications] = useState([
    "New comment on your post",
    "Your post got a like",
    "New comment on your post",
    "Your post got a like",
    "New comment on your post",
    "Your post got a like",
    "New comment on your post",
    "Your post got a like",
  ]);

  const unreadCount = useSelector((state) => state.message.unreadCount);
  const unreadCounts = useSelector((state) => state.message.unreadCounts);

  const messageTabRef = useRef(null);

  const handleMessageClick = (message) => {
    menuSound();
    setSelectedUser(message.sender);
    setIsMessageTabOpen(true);
    setIsAllMessagesTabOpen(false);
    dispatch(clearMessages());
  };

  const handleClickOutside = (event) => {
    if (
      messageTabRef.current &&
      !messageTabRef.current.contains(event.target)
    ) {
      setIsMessageTabOpen(false);
    }
  };

  const handleUserClick = (user) => {
    if (selectedUser && selectedUser._id === user._id) {
      menuSound();
      setIsMessageTabOpen(!isMessageTabOpen);
    } else {
      menuSound();
      setSelectedUser(user);
      setIsMessageTabOpen(true);
      dispatch(clearMessages());
    }
  };

  const playSound = () => {
    const audio = new Audio("/sounds/sao_menu.mp3");
    audio.play();
  };

  const menuSound = () => {
    const audio = new Audio("/sounds/sao_menu_select.mp3");
    audio.play();
  };

  const toggleUsersDropdown = () => {
    if (!isUsersDropdownOpen) {
      playSound();
    }

    setIsUsersDropdownOpen(!isUsersDropdownOpen);
    setIsMessageTabOpen(!MessageTab);
  };

  const toggleAllMessagesTab = () => {
    if (!isAllMessagesTabOpen) {
      playSound();
    }
    setIsAllMessagesTabOpen(!isAllMessagesTabOpen);
    setIsMessageTabOpen(false);
  };

  const toggleNotifications = () => {
    playSound();
    setIsNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getUnreadMessagesCount());
      dispatch(getUnreadMessagesCounts());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    console.log("Unreadcounts:", unreadCounts);
  }, [unreadCounts]);

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
      icon: <ImHome fontSize="large" />,
      link: "/home",
    },
    { text: "Lore", icon: <GiTiedScroll fontSize="large" />, link: "/lore" },
    {
      text: "Messages",
      icon: <TextsmsRoundedIcon fontSize="small" />,
      onClick: toggleAllMessagesTab,
    },
    {
      text: "Users",
      icon: (
        <div className="relative">
          <FaArrowsDownToPeople fontSize="large" />
          {Object.values(unreadCounts).reduce((a, b) => a + b, 0) > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {Object.values(unreadCounts).reduce((a, b) => a + b, 0)}
            </span>
          )}
        </div>
      ),
      onClick: toggleUsersDropdown,
    },
    {
      text: "Notifications",
      icon: <PiBellSimpleRingingFill fontSize="large" />,
      onClick: toggleNotifications,
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
            <Link to="/profile" className="flex items-center space-x-3">
              <Avatar
                src={`http://localhost:3000/${currentUser.avatar}`}
                alt={`${currentUser.firstname}'s avatar`}
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
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
                    <span className="hidden md:inline group-hover:text-gray-800 no-underline">
                      {item.text}
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-3 group">
                    {item.icon}
                    <span className="hidden md:inline group-hover:text-gray-800">
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
                <ul
                  className="pl-8 space-y-2 overflow-y-auto mb-1"
                  style={{ maxHeight: "400px" }}
                >
                  {users
                    .filter((user) => user._id !== currentUser._id)
                    .map((user, userIndex) => (
                      <li
                        key={user._id}
                        onClick={() => handleUserClick(user)}
                        className="cursor-pointer group animate__animated animate__fadeInRight relative flex items-center space-x-3"
                        style={{
                          animationDelay: `${(userIndex + 1) * 0.1}s`,
                          animationDuration: "0.7s",
                        }}
                      >
                        {unreadCounts[user._id] > 0 && (
                          <span className="absolute left-0 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center transform -translate-x-4 -translate-y-1/2 top-1/2"></span>
                        )}
                        <span>
                          {user.firstname} {user.lastname}
                        </span>
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
                  <span className="hidden md:inline group-hover:text-gray-800 no-underline">
                    {item.text}
                  </span>
                </Link>
              ) : (
                <button className="flex items-center space-x-5 group no-underline">
                  {item.icon}
                  <span className="hidden md:inline group-hover:text-gray-800 no-underline">
                    {item.text}
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {isNotificationOpen && (
        <PostNotification
          notifications={notifications}
          isOpen={setIsNotificationOpen}
        />
      )}
      {isMessageTabOpen && selectedUser && (
        <MessageTab onClose={toggleAllMessagesTab} user={selectedUser} />
      )}
      {isAllMessagesTabOpen && (
        <AllMessagesTab
          onClose={toggleAllMessagesTab}
          onMessageClick={handleMessageClick}
        />
      )}
    </div>
  );
};

export default Sidebar;
