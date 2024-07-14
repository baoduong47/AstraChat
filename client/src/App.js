import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  const [backendData, setBackendData] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/users/signup")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setBackendData(data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  return (
    <>
      {/* {backendData.map((item) => (
        <div key={item._id}>
          <div>
            <b>Name:</b> {item.firstname} {item.lastname}
          </div>
          <div>
            <b>ID:</b> {item._id}
          </div>
          <div>
            <b>Email:</b> {item.email}
          </div>
          <div>
            <b>Username:</b> {item.username}
          </div>
          <div>
            <b>Password:</b> {item.password}
          </div>
          <br />
        </div>
      ))} */}
      <Signup />
    </>
  );
}

export default App;
