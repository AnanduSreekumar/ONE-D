import React from "react";
import LogTable from "../../components/LogTable";

const UserLogs = () => {
  const email = localStorage.getItem("email");
  return <LogTable color="teal" email={email} role="user" />;
};

export default UserLogs;
