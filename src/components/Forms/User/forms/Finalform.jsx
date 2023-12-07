import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getNotaryService } from "../../../../utils/apiService";

function FinalForm({ step, setActiveStep }) {
  const [form, setForm] = useState({
    country: "",
    state: "",
    pincode: "",
    notary: "",
  });
  const [pincode, setPincode] = useState("");
  const [values, setValues] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNotary = () => {
    const res = getNotaryService(form);
    res
      .then((response) => {
        console.log(response.data.data);
        setValues(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    console.log(form);
  };

  return (
    <Box px={12}>
      <Stack spacing={4} w={"full"} maxW={"md"}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Country Going to
        </Heading>
      </Stack>
      <Flex mt={3}>
        <FormControl isRequired p={2}>
          <FormLabel>Country</FormLabel>
          <Input onChange={handleChange} type="text" name="country" />
        </FormControl>
        <FormControl isRequired p={2}>
          <FormLabel>State</FormLabel>
          <Input onChange={handleChange} type="text" name="state" />
        </FormControl>
        <FormControl isRequired p={2}>
          <FormLabel>Pincode</FormLabel>
          <Input onChange={handleChange} type="number" name="pincode" />
        </FormControl>
      </Flex>
      <Flex>
        <Button mx={2} w={"full"} size="lg" m={4} onClick={handleNotary}>
          Check Notary
        </Button>
      </Flex>
      <Flex>
        <FormControl isRequired p={2}>
          <FormLabel>Notary Service</FormLabel>
          <Select onChange={handleChange} type="text" name="notary">
            <>
              {values.map((value, key) => (
                <option key={key} value={value[0]}>
                  {value[0]} - {value[2]}
                </option>
              ))}
            </>
          </Select>
        </FormControl>
      </Flex>

      <Flex>
        <Button
          mx={2}
          w={"full"}
          isDisabled={values.length === 0}
          bgGradient="linear(to-r, red.500, yellow.500)"
          _hover={{
            bgGradient: "linear(to-r, red.600, yellow.600)",
          }}
          size="lg"
          m={4}
          onClick={() => setActiveStep(step + 1)}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}

export default FinalForm;
