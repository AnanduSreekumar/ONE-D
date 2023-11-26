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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Welcomesvg from "../../assets/welcome.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link as ReactRouterLink } from "react-router-dom";
import { register } from "../../utils/apiService";

export default function Register() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, pass);
      toast({
        title: "Successfully logged in",
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      return navigate("/create");
    } catch (error) {
      console.error("Login failed", error);
      toast({
        title: "Error",
        position: "top",
        description: "Please type in valid credentials",
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
      <Stack minH={"80vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Create a new account</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <FormControl id="email" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
          <Image boxSize="80vh" alt={"Login Image"} src={Welcomesvg} />
        </Flex>
      </Stack>
    </motion.div>
  );
}
