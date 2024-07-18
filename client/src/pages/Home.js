import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/userActions";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log("User state:", users);

  return (
    <div>
      <h1>All Users List</h1>
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
