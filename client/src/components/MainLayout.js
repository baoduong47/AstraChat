import React from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div
      id="root"
      className="flex min-h-screen text-black"
      style={{
        backgroundImage: "url('/images/fantasychar.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      <div className="ml-6 mr-52 mt-6 flex-grow flex flex-col h-full">
        {children}
      </div>
      <Sidebar />
    </div>
  );
};

export default MainLayout;
