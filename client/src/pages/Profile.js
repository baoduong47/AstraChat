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

  console.log("Updated user", currentUser);

  const [formData, setFormData] = useState({
    avatar: null,
  });

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      const data = new FormData();

      data.append("avatar", formData.avatar);

      dispatch(updateCurrentUser(data));
    } else {
      console.log("User is not authenticated at the moment");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : !currentUser ? (
        <p>User not found</p>
      ) : (
        <>
          <h1>{currentUser?.firstname}'s Page</h1>
          <form onSubmit={onSubmit}>
            <div>
              <Avatar
                src={`http://localhost:3000/${currentUser.avatar}`}
                alt={`${currentUser.firstname}'s avatar`}
                className="w-24 h-24 rounded-full object-cover"
                key={currentUser.avatar}
              />
              <input type="file" name="avatar" onChange={handleChange} />
              <button type="submit">Submit</button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Profile;
