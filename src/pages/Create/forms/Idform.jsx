import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Select,
  useColorMode,
  Box,
  SlideFade,
  CloseButton,
  Image,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  ArrowUpIcon,
  SmallCloseIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import IdType from "../../../components/IdType";
import axios from "axios";
import { useDropzone } from "react-dropzone";

export default function Idform({ step, setActiveStep }) {
  const toast = useToast();

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [files, setFiles] = useState([]);
  const handleChange = async (e) => {
    setFile(e.target.files[0]);
    console.log(step);
    setPreview(URL.createObjectURL(e.target.files[0]));
    let formData = new FormData();
    console.log(file);
    formData.append("file", file);
    formData.append("doc_type", type);
    formData.append("doc_country", country);
    formData.append("doc_state", state);
    formData.append("email", "jeswanthv01@gmail.com");

    // await axios
    //   .post("https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       // window.location.reload();
    //       // window.location = "/files";
    //       console.log(response);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       // setShow(true);
    //     }
    //   });
  };
  const clearFile = (e) => {
    setFile(null);
    setPreview(null);
  };
  const [inputList, setInputList] = useState([<IdType />]);

  // const onAddBtnClick = (event) => {
  //   const newInput = Date.now();
  //   setInputList((v) => [...v, newInput]);
  // };

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
  const handleSubmit = (event) => {
    setLoading(true);

    let formData = new FormData();
    formData.append("file", files[0]);
    formData.append("doc_type", type);
    formData.append("doc_country", country);
    formData.append("doc_state", state);
    formData.append("email", "jeswanthv01@gmail.com");
    try {
      axios
        .post(
          "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            // window.location.reload();
            // window.location = "/files";
            console.log(response);
            setActiveStep(step + 1);
            setLoading(false);
            toast({
              title: "File Uploaded",
              position: "top",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response);
            toast({
              title: "Upload Failed",
              position: "top",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            setLoading(false);
          }
        });
    } catch {
      // setShow(true);
    }
  };
  return (
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
              <Input padding={1} type="file" w="full" onChange={handleChange} />
            </Center>
          </Stack>
        </FormControl>
        <IdType
          setType={setType}
          country={country}
          setCountry={setCountry}
          state={state}
          setState={setState}
        />
        <Flex>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              File upload
            </Heading>
            {files.length == 0 && (
              <Box
                border={1}
                borderRadius={3}
                p={14}
                backgroundColor={
                  colorMode === "light" ? "gray.100" : "gray.600"
                }
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

        <Button
          isLoading={loading}
          loadingText="Uploading"
          onClick={handleSubmit}
          colorScheme="orange"
          variant="outline"
        >
          Upload
        </Button>
      </Stack>
    </Flex>
  );
}