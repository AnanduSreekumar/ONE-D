import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Card_id from "../../components/Card_id";
import OTPForm from "../../components/Forms/Checker/OTPForm";

const CHome = () => {
  const [data, setData] = useState(null);
  const email = localStorage.getItem("email");
  const role = "checker";
  return (
    <>
      {data ? (
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          maxW={"1000px"}
          my={10}
        >
          <Card_id data={data} />
        </Flex>
      ) : (
        <OTPForm setData={setData} email={email} role={role} />
      )}
      {console.log(data)}
    </>
  );
};

export default CHome;
