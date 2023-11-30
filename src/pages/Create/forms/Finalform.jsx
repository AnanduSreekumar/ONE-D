import React, { useState } from "react";
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

function FinalForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [notary, setNotary] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");

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
          <Input
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired p={2}>
          <FormLabel>State</FormLabel>
          <Input
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired p={2}>
          <FormLabel>Pincode</FormLabel>
          <Input
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl
          isDisabled={pincode === "" ? true : false}
          isRequired
          p={2}
        >
          <FormLabel>Notary Service</FormLabel>
          <Select
            placeholder="Select Notary Service"
            value={notary}
            onChange={(e) => setNotary(e.target.value)}
          >
            <option value="UPS">UPS</option>
            <option value="Notary1">Notary1</option>
            <option value="Notary2">Notary2</option>
          </Select>
        </FormControl>
      </Flex>

      <FormControl isRequired p={2}>
        <FormLabel>Mode</FormLabel>
        <Flex justifyContent={"space-between"}>
          <Button mx={2} w={"full"} size="lg">
            Normal
          </Button>
          <Button
            mx={2}
            w={"full"}
            bgGradient="linear(to-r, red.500, yellow.500)"
            _hover={{
              bgGradient: "linear(to-r, red.600, yellow.600)",
            }}
            size="lg"
          >
            Express
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
}

export default FinalForm;
