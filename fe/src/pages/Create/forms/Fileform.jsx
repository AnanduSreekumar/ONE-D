import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  useColorMode,
  Image,
  CloseButton,
  SlideFade,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Fileform(props) {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    maxFiles: 1,
  });

  const thumbs = files.map((file) => (
    <SlideFade
      in
      offsetY="-20px"
      transition={{ exit: { delay: 1 }, enter: { duration: 0.5 } }}
    >
      <CloseButton onClick={() => setFiles([])} size="md" />
      <Image
        height="250px"
        mb={3}
        w={"full"}
        objectFit={"contain"}
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </SlideFade>
  ));

  const { colorMode } = useColorMode();

  return (
    <Container>
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            File upload
          </Heading>
          {files.length == 0 && (
            <Box
              border={1}
              borderRadius={3}
              p={14}
              backgroundColor={colorMode === "light" ? "gray.100" : "gray.600"}
              borderStyle={"dashed"}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some file here, or click to selectfile</p>
            </Box>
          )}
        </Stack>
      </Flex>
      <Flex marginTop={2} align={"center"} justify={"center"}>
        <Stack w={"full"} margin={"auto"} maxW={"md"}>
          <Box borderRadius={"md"} bg={"gray.600"}>
            {thumbs}
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
}
