import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div>
      default
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
