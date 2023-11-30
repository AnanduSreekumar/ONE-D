import React, { useState } from "react";
import Card_id from "../../components/Card_id";
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const NotaryDashboard = () => {
  const [country, setCountry] = useState("United States");

  const [state, setState] = useState("California");

  const [firstname, setFirstname] = useState("Jeswanth");

  const [lastname, setLastname] = useState("vadlamudi");
  const [Dob, setdob] = useState("10/25/2001");
  const [expiry, setExpiry] = useState("10/25/2001");
  const [sign, setSign] = useState("");
  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        maxW={"1000px"}
        my={10}
      >
        <Stack>
          <Card_id />
          <Text fontWeight={"bold"} fontSize={"4xl"}>
            User Details
          </Text>
          <Card my={4} p={4}>
            <Image
              height="250px"
              mb={3}
              w={"full"}
              objectFit={"contain"}
              src="https://imengine.prod.srp.navigacloud.com/?uuid=30C5FDA4-714D-4543-B902-56AB5904A2ED&type=primary&q=72&width=1024"
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </Card>
          <Checkbox
            colorScheme="teal"
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) =>
              setCheckedItems([
                e.target.checked,
                e.target.checked,
                e.target.checked,
                e.target.checked,
                e.target.checked,
                e.target.checked,
              ])
            }
          >
            Check all items
          </Checkbox>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Flex alignItems={"center"}>
              <FormControl id="firstname">
                <FormLabel>firstname</FormLabel>
                <Input disabled value={firstname} type="text" />
              </FormControl>
              <Checkbox
                isChecked={checkedItems[0]}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, checkedItems[1]])
                }
                colorScheme="teal"
                ml={3}
                mt={7}
              />
            </Flex>
            <Flex alignItems={"center"}>
              <FormControl id="lastname">
                <FormLabel>lastname</FormLabel>
                <Input disabled value={lastname} type="text" />
              </FormControl>
              <Checkbox
                isChecked={checkedItems[1]}
                onChange={(e) =>
                  setCheckedItems([checkedItems[0], e.target.checked])
                }
                colorScheme="teal"
                ml={3}
                mt={7}
              />
            </Flex>
            <Flex alignItems={"center"}>
              <FormControl id="country">
                <FormLabel>country</FormLabel>
                <Input disabled value={country} type="text" />
              </FormControl>
              <Checkbox
                isChecked={checkedItems[2]}
                onChange={(e) =>
                  setCheckedItems([...checkedItems[1], e.target.checked])
                }
                colorScheme="teal"
                ml={3}
                mt={7}
              />
            </Flex>
            <Flex alignItems={"center"}>
              <FormControl id="state">
                <FormLabel>state</FormLabel>
                <Input disabled value={state} type="text" />
              </FormControl>
              <Checkbox
                isChecked={checkedItems[3]}
                onChange={(e) =>
                  setCheckedItems([...checkedItems[2], e.target.checked])
                }
                colorScheme="teal"
                ml={3}
                mt={7}
              />
            </Flex>
            <Flex alignItems={"center"}>
              <FormControl id="Dob">
                <FormLabel>Dob</FormLabel>
                <Input disabled value={Dob} type="text" />
              </FormControl>
              <Checkbox
                isChecked={checkedItems[4]}
                onChange={(e) =>
                  setCheckedItems([...checkedItems[3], e.target.checked])
                }
                colorScheme="teal"
                ml={3}
                mt={7}
              />
            </Flex>
            <Flex alignItems={"center"}>
              <FormControl id="Expiry">
                <FormLabel>Expiry</FormLabel>
                <Input disabled value={expiry} type="text" />
              </FormControl>
              <Checkbox
                isChecked={checkedItems[5]}
                onChange={(e) =>
                  setCheckedItems([...checkedItems[4], e.target.checked])
                }
                colorScheme="teal"
                ml={3}
                mt={7}
              />
            </Flex>
            <GridItem colSpan={2}>
              <FormControl isRequired id="sign">
                <FormLabel>Signature</FormLabel>
                <Input
                  value={sign}
                  onChange={(e) => setSign(e.target.value)}
                  type="text"
                />
              </FormControl>
            </GridItem>
            <Button colorScheme="red">Dispute</Button>
            <Button
              isDisabled={sign.length < 3 && !allChecked}
              colorScheme="teal"
            >
              Approve
            </Button>
          </Grid>
        </Stack>
      </Flex>
    </>
  );
};

export default NotaryDashboard;
