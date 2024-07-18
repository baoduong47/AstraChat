import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/userActions";
import { getCurrentUser } from "../redux/actions/userActions";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import LogoutButton from "../components/LogoutButton";

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
        {currentUser ? (
          <>
            <PersonIcon
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            {currentUser.firstname}
          </>
        ) : (
          "Guest"
        )}
      </h1>
      <h2 className="mt-5">
        {" "}
        <PeopleIcon style={{ verticalAlign: "middle", marginRight: "8px" }} />
        All Users List <LogoutButton />
      </h2>

      <ul>
        {users.map((item) => (
          <li key={item._id}>
            {item.firstname} {item.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
