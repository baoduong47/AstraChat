import React from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div
      id="root"
      className="flex h-screen w-screen bg-messageBackground text-black"
    >
      <div className="ml-6 mr-52 mt-6 flex-grow flex flex-col bg-messageBackground">
        {children}
      </div>
      <Sidebar />
    </div>
  );
};

export default MainLayout;
