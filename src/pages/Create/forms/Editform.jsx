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
  Textarea,
} from "@chakra-ui/react";
import { getAge } from "../../../utils/data";
import axios from "axios";

function EditForm({ step, setActiveStep }) {
  const [firstname, setfirstname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [lastname, setlastname] = useState("");
  const [sex, setsex] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [drivingtype, setdrivingtype] = useState("");
  const [occupation, setoccupation] = useState("");
  const [Country, setCountry] = useState("");
  const [county, setcounty] = useState("");
  const [state, setstate] = useState("");
  const [expiry, setexpiry] = useState("");
  const [Dob, setDob] = useState("");

  const handleSubmit = (e) => {
    let user = localStorage.getItem("email");
    const age = getAge(Dob);

    e.preventDefault();
    axios
      .post(
        "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/set_textract_data",
        {
          email: user,
          address,
          country: Country,
          state: state,
          pincode: pincode,
          firstname,
          lastname,
          county,
          middlename: middlename,
          driving_license: drivingtype,
          age: age,
          sex: sex,
          expiry: expiry,
          occupation: occupation,
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
          setActiveStep(step + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  return (
    <Box px={12}>
      <Stack spacing={4} w={"full"} maxW={"md"}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Edit info
        </Heading>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Flex mt={3}>
          <FormControl isRequired p={2}>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
            />
          </FormControl>
          <FormControl p={2}>
            <FormLabel>Middle Name</FormLabel>
            <Input
              placeholder="First Name"
              value={middlename}
              onChange={(e) => setmiddlename(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired p={2}>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>Country</FormLabel>
            <Input
              placeholder="Country"
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired p={2}>
            <FormLabel>State</FormLabel>
            <Input
              placeholder="State"
              value={state}
              onChange={(e) => setstate(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>county</FormLabel>
            <Input
              placeholder="county"
              value={county}
              onChange={(e) => setcounty(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired p={2}>
            <FormLabel>pincode</FormLabel>
            <Input
              placeholder="pincode"
              value={pincode}
              onChange={(e) => setpincode(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>sex</FormLabel>
            <Input
              placeholder="sex"
              value={sex}
              onChange={(e) => setsex(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired p={2}>
            <FormLabel>occupation</FormLabel>
            <Input
              placeholder="occupation"
              value={occupation}
              onChange={(e) => setoccupation(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>Address</FormLabel>
            <Textarea
              placeholder="address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl p={2}>
            <FormLabel>Driving type(if required)</FormLabel>
            <Input
              placeholder="drivingtype"
              value={drivingtype}
              onChange={(e) => setdrivingtype(e.target.value)}
            />
          </FormControl>
        </Flex>

        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="text"
              placeholder="(MM/DD/YYYY)"
              value={Dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired p={2}>
            <FormLabel>Expiry</FormLabel>
            <Input
              type="text"
              placeholder="(MM/YYYY)"
              value={expiry}
              onChange={(e) => setexpiry(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Button
          mt={4}
          colorScheme="orange"
          variant="outline"
          w={"full"}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default EditForm;
