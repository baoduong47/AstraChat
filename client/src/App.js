import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data.message);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <div>{backendData}</div>;
}

export default App;
