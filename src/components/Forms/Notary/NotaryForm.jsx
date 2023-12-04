import {
  Checkbox,
  Stack,
  Text,
  Grid,
  Flex,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Button,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

const NotaryForm = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [form, setForm] = useState({
    firstname: data.firstname,
    lastname: data.lastname,
    country: data.country,
    state: data.state,
    Dob: data.Dob,
    expiry: data.expiry,
    sign: "",
    disputetext: "",
  });
  const [dispute, setDispute] = useState(false);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
              value={form.Dob}
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
        <GridItem colSpan={2}>
          <FormControl isRequired id="sign">
            <FormLabel>Signature</FormLabel>
            <Input value={form.sign} onChange={handleChange} type="text" />
          </FormControl>
        </GridItem>
        {dispute && (
          <GridItem colSpan={2}>
            <FormControl isRequired id="sign">
              <FormLabel>Comment</FormLabel>

              <Textarea
                value={form.disputetext}
                onChange={handleChange}
                type="text"
              />
            </FormControl>
          </GridItem>
        )}

        <Button onClick={() => setDispute(!dispute)} colorScheme="red">
          {dispute ? "Cancel Dispute" : "Dispute"}
        </Button>
        <a>
          <Button
            w={"full"}
            isDisabled={form.sign.length < 3}
            colorScheme="teal"
          >
            Approve
          </Button>
        </a>
      </Grid>
    </Stack>
  );
};

export default NotaryForm;
