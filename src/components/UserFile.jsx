import {
  Box,
  Card,
  CardHeader,
  Center,
  Flex,
  Square,
  Text,
  Icon,
  Spacer,
  IconButton,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  MenuItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  ModalOverlay,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaFile } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
// import axios from "axios";
// import config from "../constants";

const UserFile = (props) => {
  //   const apiUrl = config.apiUrl;

  const { file } = props;
  const [signedUrl, setSignedUrl] = useState(file.url);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const handleDelete = async () => {
    console.log("delete");
    const user = localStorage.getItem("email");
    // const res = await axios.delete(`${apiUrl}/api/file/${file.id}`, {
    //   data: { userId: parseInt(user) },
    // });
    toast({
      title: res.data.message,
      position: "top",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    window.location.reload();
  };
  return (
    <>
      <Card w={"full"} mx={4} my={5}>
        <Flex color="white">
          <Center flex="1">
            <FaFile />
            {/* <Icon as={FaFile} /> */}
          </Center>
          <Box flex="12">
            <CardHeader>
              <Text>{file.title}</Text>
            </CardHeader>
          </Box>

          <Flex alignItems={"center"} justifyContent={"center"} flex="1">
            <Menu>
              <MenuButton>
                <Icon as={BsThreeDotsVertical} />
              </MenuButton>
              <Portal>
                <MenuList>
                  <a href={file.url} target="_blank">
                    <MenuItem>Open</MenuItem>
                  </a>

                  <MenuItem
                    onClick={() => {
                      setOverlay(<OverlayOne />);
                      onOpen();
                    }}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
            {/* <Center flex="1">
              
            </Center> */}
          </Flex>
        </Flex>
      </Card>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Delete UserFile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure ?</Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup gap={2}>
              <Button onClick={onClose}>Close</Button>
              <Button onClick={handleDelete} colorScheme="red">
                Delete
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserFile;
