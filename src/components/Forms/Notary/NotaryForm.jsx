import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { setVerificationDetails } from "../../../utils/apiService";

const NotaryForm = ({ data, Ncountry, Nstate }) => {
  const toast = useToast();
  const [dispute, setDispute] = useState(false);
  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [form, setForm] = useState({
    firstname: data[0][2],
    lastname: data[0][3],
    country: data[0][10],
    state: data[0][12],
    Age: data[0][6],
    occupation: data[0][9],
    expiry: data[0][14],
    address: data[0][5],
    sign: "",
    disputetext: "",
  });
  const [verfication, setVerfication] = useState({
    one_id: data[0][1],
    veri_comments: "",
    verifier_email: localStorage.getItem("email"),
    country: Ncountry,
    state: Nstate,
  });

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleVerificationChange = (e) => {
    setVerfication({ ...verfication, [e.target.name]: e.target.value });
  };

  const handleVerficiation = (e) => {
    e.preventDefault();
    const res = setVerificationDetails(verfication, !dispute);
    res.then((data) => {
      console.log(data);
      toast({
        title: "Verification Success",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };
  return (
    <Stack>
      <Text fontWeight={"bold"} fontSize={"4xl"}>
        User Details
      </Text>

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
            <Input
              disabled
              name="firstname"
              onChange={handleChange}
              value={form.firstname}
              type="text"
            />
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
            <Input
              disabled
              onChange={handleChange}
              value={form.lastname}
              type="text"
            />
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
            <Input
              disabled
              onChange={handleChange}
              value={form.country}
              type="text"
            />
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
            <Input
              disabled
              onChange={handleChange}
              value={form.state}
              type="text"
            />
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
            <FormLabel>Age</FormLabel>
            <Input
              disabled
              onChange={handleChange}
              value={form.Age}
              type="text"
            />
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
            <Input
              disabled
              onChange={handleChange}
              value={form.expiry}
              type="text"
            />
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
        <Flex alignItems={"center"}>
          <FormControl id="firstname">
            <FormLabel>Occupation</FormLabel>
            <Input
              disabled
              name="occupation"
              onChange={handleChange}
              value={form.occupation}
              type="text"
            />
          </FormControl>
        </Flex>
        <GridItem colSpan={2}>
          <FormControl isRequired id="sign">
            <FormLabel>Signature</FormLabel>
            <Input
              value={form.sign}
              name="sign"
              onChange={handleChange}
              type="text"
            />
          </FormControl>
        </GridItem>
        {dispute && (
          <>
            <GridItem colSpan={2}>
              <FormControl isRequired id="sign">
                <FormLabel>Comment</FormLabel>

                <Textarea
                  value={verfication.veri_comments}
                  name="veri_comments"
                  onChange={handleVerificationChange}
                  type="text"
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <Button w={"full"} onClick={handleVerficiation} colorScheme="red">
                Send dispute
              </Button>
            </GridItem>
          </>
        )}

        <Button onClick={() => setDispute(!dispute)} colorScheme="red">
          {dispute ? "Cancel Dispute" : "Dispute"}
        </Button>
        <a>
          <Button w={"full"} colorScheme="teal" onClick={handleVerficiation}>
            Approve
          </Button>
        </a>
      </Grid>
    </Stack>
  );
};

export default NotaryForm;
