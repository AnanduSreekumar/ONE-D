import React from "react";
import Checkersvg from "../../../assets/Checker.svg";

import Register from "../../User/Auth/Register";

const CRegister = () => {
  return (
    <Register role="checker" link="/checker" color="pink" image={Checkersvg} />
  );
};

export default CRegister;
