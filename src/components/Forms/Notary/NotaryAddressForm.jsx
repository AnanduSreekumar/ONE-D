import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { uploadNotaryTextdata } from "../../../utils/apiService";

const NotaryAddressForm = () => {
  const email = localStorage.getItem("email");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    country: "",
    state: "",
    pincode: "",
    address: "",
    email,
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await uploadNotaryTextdata(form);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(err);
    }
  };
  return (
    <Box px={12} maxW={"50%"} margin={"auto"} mt={5}>
      <Stack spacing={4} w={"full"} maxW={"md"}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Notary Details
        </Heading>
      </Stack>
      <Flex mt={3}>
        <FormControl isRequired p={2}>
          <FormLabel>First Name</FormLabel>
          <Input onChange={handleChange} type="text" name="firstname" />
        </FormControl>
        <FormControl isRequired p={2}>
          <FormLabel>Last Name</FormLabel>
          <Input onChange={handleChange} type="text" name="lastname" />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl isRequired p={2}>
          <FormLabel>Country</FormLabel>
          <Input onChange={handleChange} type="text" name="country" />
        </FormControl>
      </Flex>

      <Flex>
        <FormControl isRequired p={2}>
          <FormLabel>State</FormLabel>
          <Input onChange={handleChange} type="text" name="state" />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl isRequired p={2}>
          <FormLabel>Pincode</FormLabel>
          <Input onChange={handleChange} type="number" name="pincode" />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl isRequired p={2}>
          <FormLabel>Address</FormLabel>
          <Textarea onChange={handleChange} type="text" name="address" />
        </FormControl>
      </Flex>
      <Button
        mt={4}
        colorScheme="orange"
        variant="outline"
        w={"full"}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default NotaryAddressForm;
