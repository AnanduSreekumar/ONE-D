import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getUserDetails } from "../../../utils/apiService";

const OTPForm = ({ setData, email, role }) => {
  const [id, setId] = useState("");
  const [OTP, setOTP] = useState("");

  const toast = useToast();
  const handleVerification = (e) => {
    e.preventDefault();
    try {
      const res = getUserDetails(OTP, id, email, role);
      res.then((data) => {
        console.log(data);
        setData(data.data);
      });
    } catch (error) {
      console.log(error);
    }
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
              <Text fontSize={"3xl"}>User Information</Text>
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
        </Stack>
      </Flex>
    </>
  );
};

export default OTPForm;
