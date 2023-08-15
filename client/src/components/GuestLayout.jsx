import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";

const GuestLayout = () => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default GuestLayout;
