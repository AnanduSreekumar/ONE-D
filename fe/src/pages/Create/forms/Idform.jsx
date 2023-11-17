import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  SlideFade,
  Select,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Idform() {
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  const clearFile = (e) => {
    setFile(null);
    setPreview(null);
  };
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  return (
    <SlideFade in offsetX="-60px">
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            ID info
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar bg="teal" size="xl" src={preview}>
                  {preview && (
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                      onClick={() => clearFile()}
                    />
                  )}
                </Avatar>
              </Center>
              <Center w="full">
                <Input
                  padding={1}
                  type="file"
                  w="full"
                  onChange={handleChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>ID Type</FormLabel>
            <Select onClick={() => setType(value)} placeholder="Select Type">
              <option value="Passport">Passport</option>
              <option value="Driving license">Driving license</option>
              <option value="Student ID">Student ID</option>
              <option value="Government ID">Government ID</option>
            </Select>
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              placeholder="Country"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
        </Stack>
      </Flex>
    </SlideFade>
  );
}
