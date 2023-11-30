import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

function EditForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      state: "",
      dateOfBirth: "",
      dateOfIssue: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box px={12}>
      <Stack spacing={4} w={"full"} maxW={"md"}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Edit info
        </Heading>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mt={3}>
          <FormControl isRequired p={2}>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="First Name"
              {...register("firstName", { required: true })}
            />
          </FormControl>
          <FormControl isRequired p={2}>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Last Name"
              {...register("lastName", { required: true })}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>Country</FormLabel>
            <Input
              placeholder="Country"
              {...register("country", { required: true })}
            />
          </FormControl>
          <FormControl isRequired p={2}>
            <FormLabel>State</FormLabel>
            <Input
              placeholder="State"
              {...register("state", { required: true })}
            />
          </FormControl>
        </Flex>

        <Flex>
          <FormControl isRequired p={2}>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              {...register("dateOfBirth", { required: true })}
            />
          </FormControl>
          <FormControl isRequired p={2}>
            <FormLabel>Date of Issue</FormLabel>
            <Input
              type="date"
              {...register("dateOfIssue", { required: true })}
            />
          </FormControl>
        </Flex>
        <Button
          mt={4}
          colorScheme="orange"
          variant="outline"
          w={"full"}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default EditForm;
