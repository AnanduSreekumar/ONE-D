import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errorsvg from "../../../assets/Error.svg";
import Waitingsvg from "../../../assets/waiting.svg";
import Card_id from "../../../components/Card_id";
import Loader from "../../../components/Loader";
import {
  getOTP,
  getOneidDetails,
  getUserStatus,
} from "../../../utils/apiService";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);

  const user = localStorage.getItem("email");

  useEffect(() => {
    const res = getUserStatus(user);
    res.then((data) => {
      const stat = data?.data[0][0];

      setStatus(stat);
    });
    const response = getOneidDetails(user);
    response.then((data) => {
      setData(data?.data.data[0]);
      setLoading(false);
    });
  }, []);

  const handleOTP = () => {
    const res = getOTP(user);
    res.then((data) => {
      setOtp(data?.data.data[0]);
      onOpen();
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Text fontSize={"4xl"}>{otp}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
      <Flex w={"1000px"} justifyContent={"end"} mt={5}>
        <Link to="/logs">
          <Button mx={2} colorScheme="teal">
            Logs
          </Button>
        </Link>
        <Button onClick={handleOTP} mx={2} colorScheme="red">
          Get OTP
        </Button>
      </Flex>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            margin={"auto"}
            maxW={"1000px"}
          >
            <Stack>
              {status === "verified" && (
                <>
                  <Card_id data={data} />
                </>
              )}
              {status === "data_updated" && (
                <>
                  <>
                    <Image
                      boxSize="60vh"
                      alt={"Login Image"}
                      src={Waitingsvg}
                    />
                    <Text textAlign={"center"} fontSize="2xl" fontWeight="bold">
                      Notary is processing your request...
                    </Text>
                  </>
                </>
              )}

              {status === "verification_failed" && (
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
      )}
    </>
  );
};

export default Dashboard;
