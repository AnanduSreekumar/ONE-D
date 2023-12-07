import React from "react";
import Notarysvg from "../../../assets/Secure.svg";
import Register from "../../User/Auth/Register";

const NRegister = () => {
  return (
    <Register role="notary" link="/notary" color="gray" image={Notarysvg} />
  );
};

export default NRegister;
