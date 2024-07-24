// MainLayout.js
import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex bg-mainbackGround text-black">
      <Sidebar />
      <div className="grow mr-16 md:mr-52 h-full lg:h-screen">
        {/* <Navbar /> */}
        <div className="ml-6 mr-6 mt-6">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
