import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React from "react";

const IdType = ({ type, setType, country, setCountry, state, setState }) => {
  return (
    <div>
      <FormControl id="idType" isRequired>
        <FormLabel>ID Type</FormLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Select Type"
        >
          <option value="passport">Passport</option>
          <option value="driving_license">Driving license</option>
          <option value="student_id">Student ID</option>
        </Select>
      </FormControl>
      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          _placeholder={{ color: "gray.500" }}
          type="text"
        />
      </FormControl>
      <FormControl id="state" isRequired>
        <FormLabel>State</FormLabel>
        <Input
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          _placeholder={{ color: "gray.500" }}
          type="text"
        />
      </FormControl>
    </div>
  );
};

export default IdType;
