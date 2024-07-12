import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users/6690b0ea402242d77de3a6f8")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBackendData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div>
        Name: {backendData.firstname} {backendData.lastname}
      </div>
      <div>Email: {backendData.email}</div>
      <div>Username: {backendData.username}</div>
      <div>Password: {backendData.password}</div>
    </>
  );
}

export default App;
