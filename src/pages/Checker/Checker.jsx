import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Checker = () => {
  return (
    <>
      <Navbar color="pink.600" type="Checker" />

      <Outlet />
    </>
  );
};

export default Checker;
