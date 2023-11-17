import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  Link,
  Grid,
} from "@chakra-ui/react";
import Welcomesvg from "../../assets/welcome.svg";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Signup() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (email === "" && pass === "") {
      toast({
        title: "Invalid credentials.",
        description: "Error!",
        status: "error",
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
                <Input type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Last name</FormLabel>
                <Input type="text" />
              </FormControl>
            </Grid>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text>
                  Already a user?{" "}
                  <Link color={"blue.500"} href="/login">
                    Login
                  </Link>
                </Text>
              </Stack>
              <Button
                onClick={handleLogin}
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
