import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
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
  Box,
  Heading,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
const NotaryForm = () => {
  let user = localStorage.getItem("email");
  const [status, setStatus] = useState("");
  const [values, setvalues] = useState([]);

  const [loading, setloading] = useState(true);
  const [dispute, setDispute] = useState(false);
  const [disputetext, setDisputetext] = useState("");
  const [id, setId] = useState("");
  const [OTP, setOTP] = useState("");

  const handleVerification = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/login_one_id",
        {
          otp: OTP,
          one_id: id,
        }
      )
      .then(function (response) {
        console.log(response);
        // window.location = "/auth";
        setvalues(response.data.data[0][0]);
        setFirstname(values[2]);
        setLastname(values[3]);
        setCountry(values[10]);
        setState(values[12]);
        setdob(values[6]);
        setExpiry("10/10/2025");
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
        // susetShow(true);
      });
    console.log(id, OTP);
  };

  const handleStatus = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/set_verification",
        {
          email: user,
          address: Naddress,
          country: Ncountry,
          state: Nstate,
          pincode: Npincode,
          firstname: Nfirstname,
          lastname: Nlastname,
          county: Ncounty,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // window.location.reload();
          // window.location = "/files";
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/set_textract_data",
        {
          email: user,
          address: Naddress,
          country: Ncountry,
          state: Nstate,
          pincode: Npincode,
          firstname: Nfirstname,
          lastname: Nlastname,
          county: Ncounty,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // window.location.reload();
          // window.location = "/files";
          console.log(response);
          setStatus(response.data.data[0][0]);
          setloading(false);

          getStatus();
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const getStatus = () => {
    axios
      .post(
        "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/login",
        { email: user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // window.location.reload();
          // window.location = "/files";
          console.log(response);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    getStatus();
  }, []);

  const [Nlastname, setNlastname] = useState("");
  const [Npincode, setNpincode] = useState("");
  const [Ncounty, setNcounty] = useState("");
  const [Naddress, setNaddress] = useState("");
  const [Ncountry, setNcountry] = useState("");
  const [Nstate, setNstate] = useState("");
  const [Nfirstname, setNfirstname] = useState("");
  const [country, setCountry] = useState("India");

  const [state, setState] = useState("Kerala");

  const [firstname, setFirstname] = useState("Anandu");

  const [lastname, setLastname] = useState("Sreekumar");
  const [Dob, setdob] = useState("04/07/1996");
  const [expiry, setExpiry] = useState("02/07/2027");
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
        {console.log(status)}

        {status === "created" ? (
          <>
            <Box px={12}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Notary info
                </Heading>
              </Stack>
              <form onSubmit={handleSubmit}>
                <Flex mt={3}>
                  <FormControl isRequired p={2}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder="First Name"
                      value={Nfirstname}
                      onChange={(e) => setNfirstname(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired p={2}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder="Last Name"
                      value={Nlastname}
                      onChange={(e) => setNlastname(e.target.value)}
                    />
                  </FormControl>
                </Flex>
                <Flex>
                  <FormControl isRequired p={2}>
                    <FormLabel>Country</FormLabel>
                    <Input
                      placeholder="Country"
                      value={Ncountry}
                      onChange={(e) => setNcountry(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired p={2}>
                    <FormLabel>State</FormLabel>
                    <Input
                      placeholder="State"
                      value={Nstate}
                      onChange={(e) => setNstate(e.target.value)}
                    />
                  </FormControl>
                </Flex>
                <Flex>
                  <FormControl isRequired p={2}>
                    <FormLabel>pin code</FormLabel>
                    <Input
                      placeholder="pincode"
                      value={Npincode}
                      onChange={(e) => setNpincode(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired p={2}>
                    <FormLabel>County</FormLabel>
                    <Input
                      placeholder="county"
                      value={Ncounty}
                      onChange={(e) => setNcounty(e.target.value)}
                    />
                  </FormControl>
                </Flex>
                <Flex>
                  <FormControl isRequired p={2}>
                    <FormLabel>Address</FormLabel>
                    <Textarea
                      placeholder="address"
                      value={Naddress}
                      onChange={(e) => setNaddress(e.target.value)}
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
          </>
        ) : (
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
                  <FormLabel>Age</FormLabel>
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
              {dispute && (
                <GridItem colSpan={2}>
                  <FormControl isRequired id="sign">
                    <FormLabel>Comment</FormLabel>

                    <Textarea
                      value={disputetext}
                      onChange={(e) => setDisputetext(e.target.value)}
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
                  onClick={handleStatus}
                  isDisabled={sign.length < 3}
                  colorScheme="teal"
                >
                  Approve
                </Button>
              </a>
            </Grid>
          </Stack>
        )}
      </Flex>
    </>
  );
};

export default NotaryForm;
