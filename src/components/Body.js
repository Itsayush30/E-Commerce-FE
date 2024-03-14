import React from "react";
import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <div className="flex justify-center items-center h-scree bg-gray-100">
      <Outlet />
    </div>
  );
};
export default Body;