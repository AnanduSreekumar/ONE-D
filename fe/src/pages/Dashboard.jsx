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

  // const apiUrl = config.apiUrl;
  const files = [
    {
      title: "file1.txt",
      url: "https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3.png",
      size: "10KB",
    },
    { title: "file2.jpg", size: "500KB" },
    { title: "file3.pdf", size: "1MB" },
  ];
  // const fetchData = async (user) => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/api/files`, {
  //       params: { user },
  //     });
  //     setData(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     // Handle errors
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const user = localStorage.getItem("email");
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
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
          {verified ? (
            <>
              <Card_id />
            </>
          ) : (
            <>
              <Image boxSize="60vh" alt={"Login Image"} src={Errorsvg} />
              <Text textAlign={"center"} fontSize="2xl" fontWeight="bold">
                Notary has denied your request
              </Text>
            </>
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default Home;
