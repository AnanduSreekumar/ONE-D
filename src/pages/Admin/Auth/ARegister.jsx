import React from "react";
import Adminsvg from "../../../assets/Admin.svg";
import Register from "../../User/Auth/Register";

const ARegister = () => {
  return <Register role="admin" link="/admin" color="blue" image={Adminsvg} />;
};

export default ARegister;
