import React from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div
      id="root"
      className="flex h-screen w-screen  text-black"
      style={{
        backgroundImage: "url('/images/background.jpeg')",
        backgroundSize: "contain",
        backgroundPosition: "40% bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="ml-6 mr-52 mt-6 flex-grow flex flex-col ">{children}</div>
      <Sidebar />
    </div>
  );
};

export default MainLayout;
