import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Card_id from "../../components/Card_id";

const Checker = () => {
  const [id, setId] = useState("");
  const [OTP, setOTP] = useState("");

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        maxW={"1000px"}
        my={10}
      >
        <Stack>
          <Card>
            <CardHeader>
              <Text fontSize={"3xl"}>Verfication</Text>
            </CardHeader>
            <CardBody>
              <FormControl my={3} id="id">
                <FormLabel>id</FormLabel>
                <Input value={id} type="text" />
              </FormControl>
              <FormControl id="OTP">
                <FormLabel>OTP</FormLabel>
                <Input value={OTP} type="text" />
              </FormControl>
            </CardBody>
          </Card>
          <Card_id />
        </Stack>
      </Flex>
    </>
  );
};

export default Checker;
