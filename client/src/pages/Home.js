import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/userActions";
import { getCurrentUser } from "../redux/actions/userActions";

const Home = () => {
  const dispatch = useDispatch();
  const { users, currentUser, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCurrentUser());
  }, [dispatch]);

  // // console.log("User state:", users);
  console.log("Current user:", currentUser);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>
        Welcome Back, {""}
        {currentUser ? currentUser.firstname : "Guest"}
      </h1>
      <h2>All Users List</h2>

      <ul>
        {users.map((item) => (
          <li key={item._id}>
            {item.firstname} {item.lastname}: {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
