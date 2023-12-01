import React, { useState, useEffect } from "react";
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
import axios from "axios";

function FinalForm({ step, setActiveStep }) {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [notary, setNotary] = useState("");
  const [values, setvalues] = useState([]);

  const handleNotary = () => {
    axios
      .post(
        "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/get_notary_service",
        {
          country: "United States",
          state: "California",
          pincode: "950132",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // window.location.reload();
          // window.location = "/files";
          console.log(response);
          setvalues(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Button mx={2} w={"full"} size="lg" m={4} onClick={handleNotary}>
          Check Notary
        </Button>
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
            <>
              <option value="UPS">Jeswanth</option>
            </>
          </Select>
        </FormControl>
      </Flex>

      <Flex>
        <Button
          mx={2}
          w={"full"}
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

      {/* <FormControl isRequired p={2}>
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
      </FormControl> */}
    </Box>
  );
}

export default FinalForm;
