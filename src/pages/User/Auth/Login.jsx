import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Link as ChakraLink,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import Loginsvg from "../../../assets/login.svg";
import { authenticate } from "../../../utils/cognito";

export default function Login({ link = "", color = "teal", image = Loginsvg }) {
  const toast = useToast();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    authenticate(email, pass).then(
      (data) => {
        toast({
          title: "Successfully logged in",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        localStorage.setItem("email", email);
        if (link === "") return navigate("/create");
        if (link === "/notary") return navigate("/notary");
        if (link === "/checker") return navigate("/checker");
        if (link === "/admin") return navigate("/admin");
      },
      (err) => {
        toast({
          title: "Error",
          position: "top",
          description: "Please type in valid credentials",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    );
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
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  New user?{" "}
                  <ChakraLink
                    color={`${color}.400`}
                    as={ReactRouterLink}
                    to={`${link}/register`}
                  >
                    register
                  </ChakraLink>
                </Text>
              </Stack>
              <Button
                onClick={handleLogin}
                colorScheme={color}
                variant={"solid"}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} mt={5}>
          <Image boxSize="80vh" alt={"Login Image"} src={image} />
        </Flex>
      </Stack>
    </motion.div>
  );
}
