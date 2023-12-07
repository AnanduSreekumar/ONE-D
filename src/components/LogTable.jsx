import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getCheckinDetails, raiseUserDispute } from "../utils/apiService";
import Loader from "./Loader";

const LogTable = ({ color, email, role }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dispute, setDispute] = useState("");
  const [id, setId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const res = getCheckinDetails(email, role);
    res.then((data) => {
      console.log(data.data.data);
      setData(data.data.data);
      setLoading(false);
    });
  }, []);

  const handleDispute = () => {
    console.log(dispute, id);
    const res = raiseUserDispute(email, role);
    res.then((data) => {
      console.log(data);
    });
    onClose();
  };

  const handleId = (id) => {
    setId(id);
    onOpen();
  };

  return (
    <Box w={"100%"} margin={"auto"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dispute</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <FormControl m={2} isRequired id="sign">
              <FormLabel>Comment</FormLabel>

              <Textarea
                value={dispute}
                onChange={(e) => setDispute(e.target.value)}
                name="veri_comments"
                type="text"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleDispute} colorScheme="teal" mr={3}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Flex justify={"center"} align={"center"}>
            <TableContainer mt={"50px"} width={"1000px"}>
              <Table variant="striped" colorScheme={color}>
                <Thead>
                  <Tr>
                    <Th textAlign={"left"}>User</Th>
                    <Th textAlign={"left"}>Role</Th>
                    <Th textAlign={"left"}>date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((item, key) => (
                    <Tr key={key}>
                      <Td textAlign={"left"}>{item[1]}</Td>
                      <Td textAlign={"left"}>{item[6]}</Td>
                      <Td textAlign={"left"}>{item[5]}</Td>
                      <Td textAlign={"right"}>
                        <Button
                          rightIcon={<ArrowForwardIcon />}
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleId(item[0])}
                        >
                          Raise dispute
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>{" "}
        </>
      )}
    </Box>
  );
};

export default LogTable;
