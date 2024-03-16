import React from "react";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Body;
