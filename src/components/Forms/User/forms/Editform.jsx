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
import { uploadTextdata } from "../../../../utils/apiService";

function EditForm({ step, setActiveStep, textData }) {
  var data = localStorage.getItem("textData");
  var json = JSON.parse(data)?.data;
  var obj = JSON.parse(json);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstname: obj?.FIRST_NAME,
    lastname: obj?.LAST_NAME,
    middlename: obj?.MIDDLE_NAME,
    country: localStorage.getItem("country"),
    county: obj?.COUNTY,
    pincode: obj?.ZIP_CODE_IN_ADDRESS,
    address: obj?.ADDRESS,
    sex: "",
    state: obj?.STATE_IN_ADDRESS,
    document: obj?.ID_TYPE,
    documentNumber: obj?.DOCUMENT_NUMBER,
    dob: obj?.DATE_OF_BIRTH,
    expiry: obj?.EXPIRATION_DATE,
    email: localStorage.getItem("email"),
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await uploadTextdata(form);

    localStorage.removeItem("textData");

    setActiveStep(step + 1);
    setLoading(false);
  };

  return (
    <Box px={12}>
      <Stack spacing={4} w={"full"} maxW={"md"}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Edit info
        </Heading>
      </Stack>

      <>
        <form>
          <Flex mt={3}>
            <FormControl isRequired p={2}>
              <FormLabel>First Name</FormLabel>
              <Input
                value={form.firstname}
                onChange={handleChange}
                type="text"
                name="firstname"
              />
            </FormControl>
            <FormControl p={2}>
              <FormLabel>Middle Name</FormLabel>
              <Input
                value={form.middlename}
                onChange={handleChange}
                type="text"
                name="middlename"
              />
            </FormControl>
            <FormControl isRequired p={2}>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={form.lastname}
                onChange={handleChange}
                type="text"
                name="lastname"
              />
            </FormControl>
          </Flex>
          <Flex>
            <FormControl isRequired p={2}>
              <FormLabel>Doument Type</FormLabel>
              <Input
                disabled
                value={form.document}
                onChange={handleChange}
                type="text"
                name="document"
              />
            </FormControl>
            <FormControl isRequired p={2}>
              <FormLabel>Document Number</FormLabel>
              <Input
                value={form.documentNumber}
                onChange={handleChange}
                type="text"
                name="documentNumber"
              />
            </FormControl>
          </Flex>
          <Flex>
            <FormControl isRequired p={2}>
              <FormLabel>Country</FormLabel>
              <Input
                value={form.country}
                onChange={handleChange}
                type="text"
                name="country"
              />
            </FormControl>
            <FormControl isRequired p={2}>
              <FormLabel>State</FormLabel>
              <Input
                value={form.state}
                onChange={handleChange}
                type="text"
                name="state"
              />
            </FormControl>
          </Flex>
          <Flex>
            <FormControl isRequired p={2}>
              <FormLabel>County</FormLabel>
              <Input
                value={form.county}
                onChange={handleChange}
                type="text"
                name="county"
              />
            </FormControl>
            <FormControl isRequired p={2}>
              <FormLabel>Pincode</FormLabel>
              <Input
                value={form.pincode}
                onChange={handleChange}
                type="text"
                name="pincode"
              />
            </FormControl>
          </Flex>
          <Flex>
            <FormControl isRequired p={2}>
              <FormLabel>Sex</FormLabel>
              <Input
                value={form.sex}
                onChange={handleChange}
                type="text"
                name="sex"
              />
            </FormControl>

            <FormControl isRequired p={2}>
              <FormLabel>Occupation</FormLabel>
              <Input
                value={form.occupation}
                onChange={handleChange}
                type="text"
                name="occupation"
              />
            </FormControl>
          </Flex>
          <Flex>
            <FormControl isRequired p={2}>
              <FormLabel>Date of Birth(MM/DD/YYYY)</FormLabel>
              <Input
                value={form.dob}
                onChange={handleChange}
                type="text"
                name="dob"
              />
            </FormControl>
            <FormControl isRequired p={2}>
              <FormLabel>Expiry(MM/DD/YYYY)</FormLabel>
              <Input
                value={form.expiry}
                onChange={handleChange}
                type="text"
                name="expiry"
              />
            </FormControl>
          </Flex>
          <Flex>
            <FormControl isRequired p={2}>
              <FormLabel>Address</FormLabel>
              <Textarea
                value={form.address}
                onChange={handleChange}
                type="text"
                name="address"
              />
            </FormControl>
          </Flex>

          <Button
            isLoading={loading}
            loadingText="Uploading"
            mt={4}
            colorScheme="orange"
            variant="outline"
            w={"full"}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </>
    </Box>
  );
}

export default EditForm;
