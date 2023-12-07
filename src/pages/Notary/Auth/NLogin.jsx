import React from "react";
import Notarysvg from "../../../assets/Secure.svg";
import Login from "../../User/Auth/Login";

const NLogin = () => {
  return <Login link="/notary" color="gray" image={Notarysvg} />;
};

export default NLogin;
