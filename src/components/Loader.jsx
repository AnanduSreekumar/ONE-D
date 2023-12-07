import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"400px"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Flex>
  );
};

export default Loader;
