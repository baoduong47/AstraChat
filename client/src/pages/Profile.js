import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../redux/actions/userActions";
import { GiReturnArrow } from "react-icons/gi";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { motion } from "framer-motion";
import "animate.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    avatar: null,
    bio: "",
    birthday: "",
    location: "",
    title: "",
  });

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        avatar: null,
        bio: currentUser.bio || "",
        birthday: currentUser.birthday ? formatDate(currentUser.birthday) : "",
        location: currentUser.location || "",
        title: currentUser.title || "",
      });
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    buttonSound();
    const data = new FormData();

    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }
    data.append("bio", formData.bio);
    data.append("birthday", formData.birthday);
    data.append("location", formData.location);
    data.append("title", formData.title);

    dispatch(updateCurrentUser(data));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const buttonSound = () => {
    const audio = new Audio("/sounds/ff_select.mp3");
    audio.play();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/images/choc2.jpeg')",
        backgroundSize: "contain",
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
      ) : error ? (
        <p>Error: {error}</p>
      ) : !currentUser ? (
        <p>User not found</p>
      ) : (
        <div
          className="mb-2 mt-2 bg-white bg-opacity-80 p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl w-full mx-4 animate__animated animate__fadeInRight"
          style={{ animationDelay: "0.2s", animationDuration: "1s" }}
        >
          <h1 className="text-2xl font-bold mb-4">
            {currentUser.firstname}'s Profile
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-4">
              <Avatar
                src={`http://localhost:3000/${currentUser.avatar}`}
                alt={`${currentUser.firstname}'s avatar`}
                className="w-24 h-24 rounded-full object-cover mb-4"
                key={currentUser.avatar}
              />
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                className="mb-4"
              />
            </div>
            <div className="flow-root">
              <dl className="-my-1 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 ">Title</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {currentUser.title}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Bio</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {currentUser.bio}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Birthday</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {formData.birthday}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Location</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {currentUser.location}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                name="title"
                maxLength={15}
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Birthday:</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
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
                className="h-10 bg-indigo-600 text-white border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-700 transition-all duration-200 ease-in-out"
                type="submit"
              >
                Save
              </motion.button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
