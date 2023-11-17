import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  useColorMode,
  Image,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function Fileform(props) {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
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

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const thumbs = files.map((file) => (
    <Image
      height="250px"
      objectFit={"contain"}
      src={file.preview}
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  const { colorMode } = useColorMode();

  return (
    <Container>
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            File upload
          </Heading>
          <Box
            border={1}
            borderRadius={3}
            p={14}
            backgroundColor={colorMode === "light" ? "gray.100" : "gray.600"}
            borderStyle={"dashed"}
            {...getRootProps({ className: "dropzone" })}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some file here, or click to selectfiles</p>
          </Box>

          {/* <aside>
            <h4>Accepted files</h4>
            <ul>{acceptedFileItems}</ul>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
          </aside> */}
        </Stack>
      </Flex>
      <Flex marginTop={2} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading lineHeight={1.1} fontSize={{ base: "md", sm: "lg" }}>
            Preview
          </Heading>
          {thumbs.length != 0 && <CloseButton size="md" />}
          {thumbs.length == 0 ? (
            <Image
              height="250px"
              objectFit={"contain"}
              src="gibbresh.png"
              fallbackSrc="https://via.placeholder.com/300"
            />
          ) : (
            thumbs
          )}
        </Stack>
      </Flex>
    </Container>
  );
}
