import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Card_id from "../../components/Card_id";
import OTPForm from "../../components/Forms/Checker/OTPForm";

const CHome = () => {
  const [data, setData] = useState({
    firstname: "Jeswanth",
    lastname: "Vadlamudi",
    country: "India",
    state: "TN",
    Dob: "10/10/2001",
    expiry: "10/2001",
    sign: "",
    disputetext: "",
  });
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
          <Card_id />
        </Flex>
      ) : (
        <OTPForm setData={setData} />
      )}
      {console.log(data)}
    </>
  );
};

export default CHome;
