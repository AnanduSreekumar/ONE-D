import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Link as ChakraLink,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import Welcomesvg from "../../../assets/welcome.svg";
import { register } from "../../../utils/apiService";
import userpool from "../../../utils/userpool";

export default function Register({
  role = "user",
  link = "",
  color = "teal",
  image = Welcomesvg,
}) {
  const toast = useToast();
  let navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    country: "",
    state: "",
    email: "",
    password: "",
    role,
  });
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const attributeList = [];
    console.log(form.email);
    attributeList.push(
      new CognitoUserAttribute({
        Name: "email",
        Value: form.email,
      })
    );
    let username = form.email;
    userpool.signUp(
      username,
      form.password,
      attributeList,
      null,
      (err, data) => {
        if (err) {
          toast({
            title: "Password Error",
            position: "top",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setLoading(false);
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
      }
    );
  };

  const verifyAccount = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: form.email,
      Pool: userpool,
    });
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
        register(form)
          .then((res) => {
            toast({
              title: "Account Created successfully",
              position: "top",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          })
          .catch((err) => {
            toast({
              title: "Something went wrong",
              position: "top",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
        setVerifyProcess(false);
        return navigate(`${link}/login`);
      }
    });
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
              <Button onClick={verifyAccount} colorScheme="teal" mr={3}>
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
            <form onSubmit={handleSubmit}>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <FormControl id="firstname" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input onChange={handleChange} type="text" name="firstname" />
                </FormControl>
                <FormControl id="middelname">
                  <FormLabel>Middle Name</FormLabel>
                  <Input
                    onChange={handleChange}
                    name="middlename"
                    type="text"
                  />
                </FormControl>
                <FormControl id="lastname" isRequired>
                  <FormLabel>Last name</FormLabel>
                  <Input onChange={handleChange} name="lastname" type="text" />
                </FormControl>
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <FormControl id="country" isRequired>
                  <FormLabel>Country</FormLabel>
                  <Input onChange={handleChange} name="country" type="text" />
                </FormControl>
                <FormControl id="state" isRequired>
                  <FormLabel>State</FormLabel>
                  <Input onChange={handleChange} name="state" type="text" />
                </FormControl>
              </Grid>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input onChange={handleChange} name="email" type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    name="password"
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
                  <Text mt={3}>
                    Already a user?{" "}
                    <ChakraLink
                      color={`${color}.400`}
                      as={ReactRouterLink}
                      to={`${link}/login`}
                    >
                      login
                    </ChakraLink>
                  </Text>
                </Stack>
                <Button
                  isLoading={loading}
                  loadingText="creating..."
                  type="submit"
                  colorScheme={color}
                  variant={"solid"}
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
        <Flex flex={1} mt={5}>
          <Image boxSize="80vh" alt={"Login Image"} src={image} />
        </Flex>
      </Stack>
    </motion.div>
  );
}
