import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  updateCurrentUser,
  clearUserError,
} from "../redux/actions/userActions";
import { GiReturnArrow } from "react-icons/gi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "animate.css";
import AlertNotifications from "../components/AlertNotifications";
import ConfirmationModal from "../components/ConfirmationModal";

const Settings = () => {
  const [showEmailError, setShowEmailError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [emailData, setEmailData] = useState({
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setEmailData({
        email: currentUser.email || "",
        currentPassword: currentUser.password || "",
      });
    }
  }, [currentUser]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    buttonSound();
    dispatch(clearUserError());
    if (emailData.email) {
      const updatedUserData = {
        ...currentUser,
        email: emailData.email,
      };
      dispatch(updateCurrentUser(updatedUserData));
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    buttonSound();
    setIsModalOpen(false);
  };

  const playSoundAndOpenModal = () => {
    menuSound();
    setIsModalOpen(true);
  };

  const buttonSound = () => {
    const audio = new Audio("/sounds/ff_select.mp3");
    audio.play();
  };

  const menuSound = () => {
    const audio = new Audio("/sounds/sao_menu_select.mp3");
    audio.play();
  };

  // const handleModalConfirm = () => {
  //   handleEmailSubmit();
  //   setIsModalOpen(false);
  // };

  useEffect(() => {
    if (error === "Email already in use") {
      setShowEmailError(true);
      const timer = setTimeout(() => setShowEmailError(false), 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(clearUserError());
    };
  }, [dispatch]);

  //   const handlePasswordSubmit = (e) => {
  //     e.preventDefault();
  //     if (passwordData.newPassword === passwordData.confirmPassword) {
  //       dispatch(
  //         updateCurrentUserPassword({
  //           currentPassword: passwordData.currentPassword,
  //           newPassword: passwordData.newPassword,
  //         })
  //       );
  //     } else {
  //       alert("New password and confirm password do not match!");
  //     }
  //   };

  const handleChange = (e, setData) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      {showEmailError && <AlertNotifications showEmailError={showEmailError} />}
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: "url('/images/ff16.webp')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Link to="/home">
          <GiReturnArrow className="fixed top-0 left-0 ml-5 mt-5 text-2xl" />
        </Link>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="mb-2 mt-2 bg-white bg-opacity-80 p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl w-full mx-4 animate__animated animate__fadeInRight"
            style={{ animationDelay: "0.2s", animationDuration: "1s" }}
          >
            <h1 className="text-2xl font-bold mb-4">Settings</h1>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Current Email:{" "}
                  <span className="text-gray-500">{currentUser.email}</span>{" "}
                  <div>
                    Current Password:{" "}
                    <span className="text-gray-500">
                      {currentUser.password}
                    </span>
                  </div>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Update Email:</label>
                <input
                  type="email"
                  name="email"
                  value={emailData.email}
                  onChange={(e) => handleChange(e, setEmailData)}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>
              <div className="flex justify-center mt-6">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    background: "linear-gradient(135deg, #6b7280, #4b5563)",
                    boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
                  }}
                  className="bg-indigo-600 ml-3 text-white border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700 transition-all duration-200 ease-in-out"
                  type="button"
                  onClick={playSoundAndOpenModal}
                >
                  Update Email
                </motion.button>
              </div>
            </form>

            {/* Update Password Section */}
            <form className="mt-8">
              {/* onSubmit={handlePasswordSubmit} */}
              <div className="mb-4">
                <label className="block text-gray-700">Current Password:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) => handleChange(e, setPasswordData)}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => handleChange(e, setPasswordData)}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handleChange(e, setPasswordData)}
                  className="w-full mt-2 p-2 border rounded"
                />
              </div>
              <div className="flex justify-center mt-6">
                <motion.button
                  // onClick={handleSubmit}
                  whileHover={{
                    scale: 1.05,
                    background: "linear-gradient(135deg, #6b7280, #4b5563)",
                    boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
                  }}
                  className="bg-indigo-600 ml-3 text-white border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700 transition-all duration-200 ease-in-out"
                  type="submit"
                >
                  Update Password
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleEmailSubmit}
        onClose={handleModalClose}
        title="Are you sure you want to change your email? This cannot be undone."
        cancelMsg="Cancel"
        confirmMsg="Confirm"
      />
    </div>
  );
};

export default Settings;
