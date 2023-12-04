import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Checker from "../../components/Forms/Checker/OTPForm";
import NotaryForm from "../../components/Forms/Notary/NotaryForm";

const NHome = () => {
  const [data, setData] = useState(null);
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
          <NotaryForm data={data} />
        </Flex>
      ) : (
        <Checker setData={setData} />
      )}
      {console.log(data)}
    </>
  );
};

export default NHome;
