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
import { Link as ChakraLink } from "@chakra-ui/react";

const NotaryDashboard = () => {
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
  const [country, setCountry] = useState(status[10]);

  const [state, setState] = useState("");

  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");
  const [Dob, setdob] = useState("");
  const [expiry, setExpiry] = useState("");
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
      {loading ? (
        <>
          <Spinner size="xl" />
        </>
      ) : (
        <>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            margin={"auto"}
            maxW={"1000px"}
            my={10}
          >
            <Stack>
              <Card>
                <CardHeader>
                  <Text fontSize={"3xl"}>Verfication</Text>
                </CardHeader>
                <CardBody>
                  <FormControl my={3} id="id">
                    <FormLabel>id</FormLabel>
                    <Input
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="OTP">
                    <FormLabel>OTP</FormLabel>
                    <Input
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                      type="text"
                    />
                  </FormControl>
                </CardBody>
                <Button onClick={handleVerification} m={4}>
                  Submit
                </Button>
              </Card>
            </Stack>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            margin={"auto"}
            maxW={"1000px"}
            my={10}
          >
            {console.log(status)}
          </Flex>
        </>
      )}
    </>
  );
};

export default NotaryDashboard;
