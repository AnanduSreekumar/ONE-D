import {
  Box,
  Button as ChakraLink,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");
  const [express, setExpress] = useState(false);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    console.log(name, value);

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div>
      <Cards
        number={number}
        expiry={expiry}
        cvc={cvc}
        name={name}
        focused={focus}
      />
      <form>
        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>Card Number</FormLabel>
            <Input
              type="number"
              maxLength="9"
              placeholder="Card Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={() => setFocus("number")}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>Card Holder Name</FormLabel>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocus("name")}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>Expiry</FormLabel>
            <Input
              type="number"
              placeholder="Expiry"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={() => setFocus("expiry")}
            />
          </FormControl>
          <FormControl isRequired p={2}>
            <FormLabel>CVC</FormLabel>
            <Input
              type="number"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={() => setFocus("cvc")}
            />
          </FormControl>
        </Flex>
      </form>
      <Box p={4}>
        <ChakraLink
          colorScheme="green"
          variant="outline"
          w={"full"}
          as={ReactRouterLink}
          to="/dashboard"
        >
          Make payment
        </ChakraLink>
      </Box>
    </div>
  );
};

export default PaymentForm;
