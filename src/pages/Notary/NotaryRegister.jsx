import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  Link as ChakraLink,
  Grid,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  HStack,
  PinInput,
  PinInputField,
  Switch,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Securesvg from "../../assets/Secure.svg";

import Checkersvg from "../../assets/Checker.svg";
import Welcomesvg from "../../assets/welcome.svg";
import { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { register } from "../../utils/apiService";
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import userpool from "../../utils/userpool";
import { motion } from "framer-motion";

import axios from "axios";

export default function Register() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [address, setaddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middelName, setMiddelname] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [pass, setPass] = useState("");
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [OTP, setOTP] = useState("");
  const [Notary, setNotary] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();

  const verifyAccount = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: email,
      Pool: userpool,
    });
    console.log(user);
    user.confirmRegistration(OTP, true, (err, data) => {
      if (err) {
        console.log(err);
        toast({
          title: "Otp Error",
          position: "top",
          description: "Incorect otp",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        console.log(data);
        toast({
          title: "Account verified successfully",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setVerifyProcess(false);
        return navigate("/notary/login");
      }
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(email, pass, firstName, lastName);
    try {
      const attributeList = [];
      attributeList.push(
        new CognitoUserAttribute({
          Name: "email",
          Value: email,
        })
      );
      let username = email;
      userpool.signUp(username, pass, attributeList, null, (err, data) => {
        if (err) {
          toast({
            title: "Password Error",
            position: "top",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          console.log(data);
          toast({
            title: "Otp sent",
            position: "top",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setVerifyProcess(true);
        }
      });
      axios
        .post(
          "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/create_account",
          {
            firstname: firstName,
            lastname: lastName,
            middlename: middelName,
            country,
            state,
            email: email,
            password: pass,
            role: Notary ? "notary" : "checker",
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
      // await register(email, pass);
    } catch (error) {
      console.error("Sign up failed", error);
      toast({
        title: "Error",
        position: "top",
        description: "Sign up failed",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {verifyProcess && (
        <Modal onClose={verifyProcess} isOpen={verifyProcess} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>OTP</ModalHeader>
            <ModalBody>
              <Flex my={4} w={"full"} justifyContent={"center"}>
                <HStack>
                  <Input
                    type="number"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </HStack>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={verifyAccount}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Stack minH={"80vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Create a new account</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <FormControl id="firstname" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                />
              </FormControl>
              <FormControl id="middelname" isRequired>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  value={middelName}
                  onChange={(e) => setMiddelname(e.target.value)}
                  type="text"
                />
              </FormControl>
              <FormControl id="lastname" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <FormControl id="country" isRequired>
                <FormLabel>Country</FormLabel>
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                />
              </FormControl>
              <FormControl id="state" isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                />
              </FormControl>
            </Grid>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text>
                  Already a user?{" "}
                  <ChakraLink
                    color={"teal.400"}
                    as={ReactRouterLink}
                    to="/login"
                  >
                    login
                  </ChakraLink>
                </Text>
              </Stack>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"center"}
                  justify={"start"}
                >
                  <Switch
                    colorScheme="teal"
                    onChange={() => setNotary(!Notary)}
                    value={Notary}
                    size="lg"
                  />
                  <Text>Are you a Notary?</Text>
                </Stack>
              </Stack>
              <Button
                onClick={handleRegister}
                colorScheme={"teal"}
                variant={"solid"}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} mt={5}>
          {Notary ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image boxSize="80vh" alt={"Secure Image"} src={Securesvg} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image boxSize="80vh" alt={"Cheker Image"} src={Checkersvg} />
            </motion.div>
          )}
        </Flex>
      </Stack>
    </motion.div>
  );
}
