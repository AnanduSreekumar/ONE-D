import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const AdminTable = () => {
  return (
    <Box w={"100%"} margin={"auto"}>
      <Flex justify={"center"} align={"center"}>
        <TableContainer mt={"50px"} width={"1000px"}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th textAlign={"left"}>User</Th>
                <Th textAlign={"left"}>ID</Th>
                <Th textAlign={"center"}>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textAlign={"left"}>Jeswanth</Td>
                <Td textAlign={"left"}>Passport</Td>
                <Td textAlign={"center"}>
                  <CheckCircleIcon color={"green.400"} />
                </Td>
                <Td textAlign={"right"}>
                  <ChakraLink as={ReactRouterLink} to="/admin/1">
                    <Button
                      rightIcon={<ArrowForwardIcon />}
                      colorScheme="teal"
                      size="sm"
                    >
                      See more
                    </Button>
                  </ChakraLink>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign={"left"}>Jeswanth</Td>
                <Td textAlign={"left"}>Passport</Td>
                <Td textAlign={"center"}>
                  <CheckCircleIcon color={"green.400"} />
                </Td>
                <Td textAlign={"right"}>
                  <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="teal"
                    size="sm"
                  >
                    See more
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign={"left"}>Jeswanth</Td>
                <Td textAlign={"left"}>Passport</Td>
                <Td textAlign={"center"}>
                  <CheckCircleIcon color={"green.400"} />
                </Td>
                <Td textAlign={"right"}>
                  <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="teal"
                    size="sm"
                  >
                    See more
                  </Button>
                </Td>
              </Tr>
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};

export default AdminTable;
