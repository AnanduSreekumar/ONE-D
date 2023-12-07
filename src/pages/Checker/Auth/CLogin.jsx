import React from "react";
import Checkersvg from "../../../assets/Checker.svg";
import Login from "../../User/Auth/Login";

const CLogin = () => {
  return <Login link="/checker" color="pink" image={Checkersvg} />;
};

export default CLogin;
