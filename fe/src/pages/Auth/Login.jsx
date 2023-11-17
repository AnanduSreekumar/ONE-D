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
} from "@chakra-ui/react";
import Loginsvg from "../../assets/login.svg";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { login } from "../../utils/login";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, pass);
    setUser(user);
    return navigate("/");
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
              <Input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text>
                  New user?{" "}
                  <Link color={"blue.500"} to="/register">
                    Register
                  </Link>
                </Text>
                {/* <Text color={"blue.500"}>Forgot password?</Text> */}
              </Stack>
              <Button
                onClick={handleLogin}
                colorScheme={"teal"}
                variant={"solid"}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} mt={5}>
          <Image boxSize="80vh" alt={"Login Image"} src={Loginsvg} />
        </Flex>
      </Stack>
    </motion.div>
  );
}
