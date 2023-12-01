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
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Card_id from "../../components/Card_id";
import axios from "axios";

const Checker = () => {
  const [id, setId] = useState("");
  const [OTP, setOTP] = useState("");

  const handleVerification = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/login_one_id",
        {
          otp: OTP,
          one_id: id,
        }
      )
      .then(function (response) {
        console.log(response);
        // window.location = "/auth";
      })
      .catch(function (error) {
        console.log(error);
        // susetShow(true);
      });
    console.log(id, OTP);
  };

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
                <Input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  type="text"
                />
              </FormControl>
              <FormControl id="OTP">
                <FormLabel>OTP</FormLabel>
                <Input
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  type="text"
                />
              </FormControl>
            </CardBody>
            <Button onClick={handleVerification} m={4}>
              Submit
            </Button>
          </Card>

          <Card_id />
        </Stack>
      </Flex>
    </>
  );
};

export default Checker;
