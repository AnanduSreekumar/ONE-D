import React from "react";
import Adminsvg from "../../../assets/Admin.svg";

import Login from "../../User/Auth/Login";

const ALogin = () => {
  return <Login link="/admin" color="blue" image={Adminsvg} />;
};

export default ALogin;
