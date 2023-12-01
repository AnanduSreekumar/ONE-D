import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Waitingsvg from "../assets/waiting.svg";
import Errorsvg from "../assets/Error.svg";
import axios from "axios";

import UserFile from "../components/UserFile";
import Card_id from "../components/Card_id";
import { ExternalLinkIcon } from "@chakra-ui/icons";
//   import config from "../constants";
//   import axios from "axios";
//   import File from "../components/File";

const Home = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState(null);
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("");

  // const apiUrl = config.apiUrl;
  const fetchData = async () => {
    let user = localStorage.getItem("email");
    await axios
      .post(
        "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/login",
        {
          email: user,
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
          setStatus(response.data.data[0][0]);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {console.log(status)}
      <Flex w={"1000px"} justifyContent={"end"} mt={5}>
        <a
          href="https://getjobber.com/wp-content/uploads/2022/08/Receipt-template-top.png"
          target="_blank"
        >
          <Button rightIcon={<ExternalLinkIcon />} colorScheme="pink">
            Reciept
          </Button>
        </a>
      </Flex>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        maxW={"1000px"}
      >
        <Stack>
          {status === "verified" && (
            <>
              <Card_id />
            </>
          )}
          {status === "data_updated" && (
            <>
              <>
                <Image boxSize="60vh" alt={"Login Image"} src={Waitingsvg} />
                <Text textAlign={"center"} fontSize="2xl" fontWeight="bold">
                  Notary is processing your request...
                </Text>
              </>
            </>
          )}
          {status === "verificiation_failed" && (
            <>
              <>
                <Image boxSize="60vh" alt={"Login Image"} src={Errorsvg} />
                <Text textAlign={"center"} fontSize="2xl" fontWeight="bold">
                  Notary has denied your request.
                </Text>
              </>
            </>
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default Home;
