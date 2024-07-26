import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../redux/actions/userActions";
import Avatar from "../components/Avatar";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    avatar: null,
    bio: "",
    birthday: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        avatar: null,
        bio: currentUser.bio || "",
        birthday: currentUser.birthday || "",
        email: currentUser.email || "",
        location: currentUser.location || "",
      });
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }
    data.append("bio", formData.bio);
    data.append("birthday", formData.birthday);
    data.append("email", formData.email);
    data.append("location", formData.location);

    dispatch(updateCurrentUser(data));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : !currentUser ? (
        <p>User not found</p>
      ) : (
        <div className=" mb-2 mt-2 bg-white bg-opacity-80 p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl w-full mx-4">
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
              <div className="flow-root">
                <dl className="-my-1 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Location</dt>
                    <dd className="text-gray-700 sm:col-span-2">Atlanta, GA</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Email</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      bduong1497@gmail.com
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Birthday</dt>
                    <dd className="text-gray-700 sm:col-span-2">12/14/1997</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Bio</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      I'm Cloud Strife, a former SOLDIER 1st Class from the
                      Shinra Electric Power Company. My journey began in the
                      small mountain village of Nibelheim, where I grew up
                      dreaming of joining the elite ranks of SOLDIER. I
                      eventually achieved that dream, but at a great personal
                      cost.
                    </dd>
                  </div>
                </dl>
              </div>
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
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
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
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
